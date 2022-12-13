const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); // password encryption
const asyncHandler = require("express-async-handler"); // handles errors w/o try & catch
const User = require("../models/userModel");

// @desc Register new user
// @route POST /api/users
// access Public
const registerUser = asyncHandler(async (req, res) => {
  // capture the body data
  const { name, email, password } = req.body;

  // check if all fields contain information for creating a new user
  if (!name || !email | !password) {
    throw new Error("Please add all fields");
  }

  // check if user exists
  const userExists = await User.findOne({ email });

  // user tries to register a user that already exists
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  // check if user was created - return JSON data of user
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id), // generate a signed token with the user id
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc Login a user
// @route POST /api/users/login
// access Public
const loginUser = asyncHandler(async (req, res) => {
  // get the email and password
  const { email, password } = req.body;

  //check for user email
  const user = await User.findOne({ email });

  // if the user and the password matches the user's password - return JSON
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id), // generate a signed token with the user id at the time of login
    });
  } else {
    // no match return error
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @desc Get user data
// @route GET /api/users/me
// access Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

// Generate a JWT
// signs a new token with the passed in id using the signature
// will expire in 30 days
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
