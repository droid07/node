const express = require('express');
const {
  getAllGoals,
  addGoal,
  getGoal,
  updateGoals,
  deleteGoals,
} = require('../controllers/goals');
const protect = require('../middlewares/protect');

const router = express.Router();

router.use(protect);

router.route('/').get(getAllGoals).post(addGoal);
router.route('/:id').get(getGoal).put(updateGoals).delete(deleteGoals);

module.exports = router;
