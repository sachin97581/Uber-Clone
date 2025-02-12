const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const blacklistTokenModel = require("../models/blacklistToken.model");
const captainModel = require("../models/captain.model");


// there is an error in authUser function i am not able to logout after login


module.exports.authUser = async (req, res, next) => {
    try {
        // Safely extract the token
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

        // Check if the token is missing
        if (!token) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        // Check if the token is blacklisted
        const isBlackListed = await blacklistTokenModel.findOne({ token });
        if (isBlackListed) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user in the database
        const user = await userModel.findById(decoded._id);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        // Attach the user to the request
        req.user = user;
        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error.message);
        return res.status(401).json({ message: "Unauthorized access" });
    }
};






// module.exports.authUSer = async (req, res, next) => {
//     const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

//     if (!token) {
//         return res.status(401).json({ message: "Unauthorized access" });
//     }

//     // console.log(token);
//     const isBlackListed = await blacklistTokenModel.findOne({ token: token });
//     // console.log(isBlackListed);
//     if (isBlackListed) {
//         return res.status(401).json({ message: "Unauthorized access" });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const user = await userModel.findById(decoded._id);

//         if (!user) {
//             return res.status(401).json({ message: "Unauthorized access" });
//         }

//         req.user = user;
//         return next();
//     } catch (error) {
//         console.error("Auth Middleware Error:", error);
//         return res.status(401).json({ message: "Unauthorized access" });
//     }
// }

// Captain Auth Middleware

module.exports.authCaptain = async (req, res, next) => {
    try {
        // Retrieve the token from cookies or authorization header
        const token =
            req.cookies?.token || 
            (req.headers.authorization ? req.headers.authorization.split(" ")[1] : null);

        // If no token is found, return unauthorized response
        if (!token) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        // Check if the token is blacklisted
        const isBlackListed = await blacklistTokenModel.findOne({ token: token });
        if (isBlackListed) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        // Verify the token and find the captain in the database
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);

        if (!captain) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        // Attach the captain to the request object
        req.captain = captain;

        return next();
    } catch (error) {
        // Log the error for debugging purposes (optional)
        console.error("Auth Middleware Error:", error);

        return res.status(401).json({ message: "Unauthorized access" });
    }
};