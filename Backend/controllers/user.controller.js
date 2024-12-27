
const userModel = require("../models/user.model");
const userServices = require("../services/user.services");
const { validationResult } = require("express-validator");
const blasckListTokenModel = require("../models/blacklistToken.model");

// module.exports.registerUser = async (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }
//     // console.log(req.body);
//     // i have to made some change here to make it work  
   
//         const { fullname,email, password } = req.body;;

//         // Hash the password
//         const hashedPassword =await userModel.hashPassword(password); // Await if async

//         // Create a new user
//         const user = await userServices.createUser({
//             firstname: fullname.firstname,
//             lastname: fullname.lastname,
//             email,
//             password: hashedPassword,
//         });

//         // Send a success response
//         // res.status(201).json({ message: "User registered successfully", user });
//         const token = user.generateAuthToken();
//         res.status(201).json({token , user });

// };

module.exports.registerUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullname, email, password } = req.body;

        // Hash the password
        const hashedPassword = await userModel.hashPassword(password);

        // Create a new user
        const user = new userModel({
            fullname: {
                firstname: fullname.firstname,
                lastname: fullname.lastname,
            },
            email,
            password: hashedPassword,
        });

        // Save the user
        await user.save();

        // Generate the auth token
        const token = await user.generateAuthToken();

        // Send a success response
        res.status(201).json({ token, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while registering the user" });
    }
};


// This is create at vedio time 50 min. i have just test this route via postman 
module.exports.loginUser = async(req , res , next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {email , password } = req.body;

    const user = await userModel.findOne({email}).select('+password');

    if(!user){
        return res.status(401).json({message: 'Invalid email or password '});
    }

    const isMatch = await user.comparePassword(password);

    if(!isMatch){
        return res.status(401).json({message: 'Invalid email or password '});
    }

    const token = await user.generateAuthToken();

    res.status(200).json({token , user});

}


module.exports.getUserProfile = async (req, res, next) => {
    res.status(200).json(req.user);
}


module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie("token");
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];

    await blasckListTokenModel.create({ token });

    res.status(200).json({ message: "User logged out successfully" });
}
