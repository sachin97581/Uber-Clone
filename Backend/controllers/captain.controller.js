const captainModel = require("../models/captain.model");
const captainServices = require("../services/captain.services");
const { validationResult } = require("express-validator");
const blackListedTokensModel = require("../models/blacklistToken.model");

module.exports.registerCaptain = async (req, res, next) => {
  // console.log("Request Body:", req.body); // Debug incoming data
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password, vehicle } = req.body;

  const isCaptainExist = await captainModel.findOne({ email });
  if (isCaptainExist) {
    return res.status(400).json({ message: "Captain already exists" });
  }

  const hashedPassword = await captainModel.hashPassword(password);

  const captain = await captainServices.createCaptain({
    fullname: {
      firstname: fullname.firstname,
      lastname: fullname.lastname
    },
    email,
    password: hashedPassword,
    vehicle: {
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      vehicleType: vehicle.vehicleType
    }
  });

  const token = await captain.generateAuthToken();

  res.status(201).json({ token, captain });
}

// loginCaptain

module.exports.loginCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  const captain = await captainModel.findOne({ email }).select("+password");

  if (!captain) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const isMatch = await captain.comparePassword(password);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const token = await captain.generateAuthToken();

  res.cookie("token" , token);

  res.status(200).json({ token, captain });

}

module.exports.getCaptainProfile = async (req, res, next) => {
  res.status(200).json({ captain: req.captain });  // Corrected to use req.captain
}

module.exports.logoutCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];
  await blackListedTokensModel.create({ token });
  res.clearCookie("token");
  res.status(200).json({ message: "Captain logged out successfully" });
}