const express = require('express');
const router = express.Router({ mergeParams: true });
const {
  getAllReviews,
  getReview,
  addReview,
  updateReview,
  deleteReview,
} = require('../controllers/reviews');
const advancedResults = require('../middlewares/advancedResults');
const { protect, authorize } = require('../middlewares/auth');
const Review = require('../models/Review');

router.get(
  '/',
  advancedResults(Review, {
    path: 'bootcamp',
    select: 'name description',
  }),
  getAllReviews
);

router.get('/:id', getReview);
router.post('/', protect, authorize('user', 'admin'), addReview);
router.put('/:id', protect, authorize('user', 'admin'), updateReview);
router.delete('/:id', protect, authorize('user', 'admin'), deleteReview);

module.exports = router;
