// --- Routing middleware for handling requests for goals ---

const express = require("express");

// import controller functions to pass within each route
const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");

// import authorization middleware
const { protect } = require("../middleware/authMiddleware");

// Router object for handling requests
const router = express.Router();

// Define routes
router.get("/", protect, getGoals);
router.post("/", protect, setGoal);
router.put("/:id", protect, updateGoal);
router.delete("/:id", protect, deleteGoal);

module.exports = router;
