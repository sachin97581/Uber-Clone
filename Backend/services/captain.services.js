const captainModel = require("../models/captain.model");

module.exports.createCaptain = async ({ fullname, email, password, vehicle }) => {
  // Validate fullname
  if (!fullname || !fullname.firstname || !fullname.lastname) {
    throw new Error("Missing required fields: firstname, lastname");
  }
  
  const { firstname, lastname } = fullname;
  const { color, plate, capacity, vehicleType } = vehicle;

  console.log("Data passed to createCaptain:", {
    fullname, email, password, vehicle
  });

  // Check for missing fields
  if (!email || !password || !color || !plate || !capacity || !vehicleType) {
    throw new Error(
      `Missing required fields: ${[
        !email && "email",
        !password && "password",
        !color && "color",
        !plate && "plate",
        !capacity && "capacity",
        !vehicleType && "vehicleType",
      ]
        .filter(Boolean)
        .join(", ")}`
    );
  }

  // Create captain
  const captain = await captainModel.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
    vehicle: {
      color,
      plate,
      capacity,
      vehicleType,
    },
  });

  return captain;
};
