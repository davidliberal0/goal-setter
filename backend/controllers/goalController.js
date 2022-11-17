// @desc Get Goals'
// @route GET /api/goals
// @access Private
const getGoals = (req, res) => {
  res.status(200).json({ message: "Get Goals" });
};

// @desc Set Goals
// @route POST /api/goals
// @access Private
const setGoals = (req, res) => {
  res.status(200).json({ message: "Set Goals" });
};

// @desc UPDATE Goals
// @route PUT /api/goals/:id - where id is the goal to update
// @access Private
const updateGoals = (req, res) => {
  res.status(200).json({ message: `Update Goal ${req.params.id}` });
};

// @desc Delete Goal
// @route DELETE /api/goals/:id - where id is the goal to remove
// @access Private
const deleteGoals = (req, res) => {
  res.status(200).json({ message: `Delete Goal ${req.params.id}` });
};

module.exports = {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
};
