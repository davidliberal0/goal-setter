const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/userController");

// import authorization middleware function
const { protect } = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe); // pass in authorization middleware as second argument

module.exports = router;
