// // this is user services which is intrect with database and other services

// const userModel = require("../models/user.model");

// module.exports.createUser = async ({email , firstname, lastname , password}) => {
//     if(!email || !firstname || !password){ 
//         throw new Error("Please provide all the required details");
//     }
//     const user = await userModel.create({

//         fullname: {
//             firstname,
//             lastname
//         },
//         email,
//         password
//     });
//     return user;
// }


const userModel = require("../models/user.model");

module.exports.createUser = async ({ email, firstname, lastname, password }) => {
    if (!email || !firstname || !password) {
        throw new Error("Please provide all the required details");
    }

    const user = new userModel({
        fullname: {
            firstname,
            lastname,
        },
        email,
        password,
    });

    await user.save(); // Save to the database
    return user; // Return the Mongoose instance
};
