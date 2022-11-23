const express = require("express");
const router = express.Router();

// import controller functions for handling Users
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/userController");

// import authorization middleware function
const { protect } = require("../middleware/authMiddleware");

// define routes with controllers for handling users
router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe); // pass in authorization middleware as second argument

module.exports = router;
