const express = require('express');
const router = express.Router();

const {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
} = require('../controllers/reviewController');
const { auth, authorize } = require('../middleware/authentication');

router
  .route('/')
  .get(getAllReviews)
  .post([auth, authorize('user')], createReview);

router
  .route('/:id')
  .get(getSingleReview)
  .patch([auth, authorize('user')], updateReview)
  .delete([auth, authorize('user')], deleteReview);

module.exports = router;
