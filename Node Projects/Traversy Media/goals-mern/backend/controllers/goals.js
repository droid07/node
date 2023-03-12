const Goal = require('../model/Goal');

const getAllGoals = async (req, res) => {
  const goals = await Goal.find({ user: req.user });
  res.status(200).json({ success: true, goals });
};

const getGoal = async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(404);
    throw new Error(`Goal not found with the id : ${req.params.id}`);
  }

  res.status(200).json({ success: true, goal });
};

const addGoal = async (req, res) => {
  const { text } = req.body;
  req.body.user = req.user;

  if (!text) {
    res.status(400);
    throw new Error('Please add goal text');
  }

  const goal = await Goal.create(req.body);
  res.status(200).json({ success: true, goal });
};

const updateGoals = async (req, res) => {
  const { text } = req.body;

  if (!text) {
    res.status(400);
    throw new Error('Please add goal text');
  }

  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error(`Goal not found with the id : ${req.params.id}`);
  }

  if (goal.user.toString() !== req.user.toString()) {
    res.status(401);
    throw new Error(`User not authorized`);
  }

  goal.text = req.body.text;
  const updateGoal = await goal.save();

  res.status(200).json({ success: true, updateGoal });
};

const deleteGoals = async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error(`Goal not found with the id : ${req.params.id}`);
  }

  if (goal.user.toString() !== req.user.toString()) {
    res.status(401);
    throw new Error(`User not authorized`);
  }

  await goal.remove();

  res
    .status(200)
    .json({
      success: true,
      id: req.params.id,
      message: 'Goal removed successfully',
    });
};

module.exports = { getAllGoals, getGoal, updateGoals, deleteGoals, addGoal };
