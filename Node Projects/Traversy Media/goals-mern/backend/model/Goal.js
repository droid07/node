const mongoose = require('mongoose');

const GoalSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  text: {
    type: String,
    required: [true, 'Please enter a goal'],
  },
});

module.exports = mongoose.model('Goal', GoalSchema);
