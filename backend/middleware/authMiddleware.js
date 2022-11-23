const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // general token format - Bearer TOKEN

  // check if a token exists in the headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get token from header
      token = req.headers.authorization.split(" ")[1];

      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token - find user by id that is inside the token
      req.user = await User.findById(decoded.id).select("-password");

      next(); // calls the next middleware
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("NOT AUTHORIZED");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("NOT AUTHORIZED. NO TOKEN");
  }
});

module.exports = { protect };
