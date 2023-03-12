const Story = require('../models/Story');

const getAllStories = async (req, res) => {
  const stories = await Story.find().populate('user');
  res.status(200).json({ success: true, stories });
};

module.exports = { getAllStories };
