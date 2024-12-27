const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.authUSer = async (req, res, next) => {
    // if there is any error occurs during logout i have add ? after authorization? like this 
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized access" });
    }

    const isBlackListed = await userModel.findOne({ blackListedTokens: token });

    if (isBlackListed) {
        return res.status(401).json({ message: "Unauthorized access" });
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        if (!user) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        req.user = user;
        return next();
        

    }catch (error) {
        return res.status(401).json({ message: "Unauthorized access" });
    }
    

}