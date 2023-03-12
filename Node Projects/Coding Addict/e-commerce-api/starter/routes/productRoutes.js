const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
} = require('../controllers/productController');

const { getSingleProductReview } = require('../controllers/reviewController');

const { auth, authorize } = require('../middleware/authentication');

router
  .route('/')
  .post([auth, authorize('admin')], createProduct)
  .get(getAllProducts);

router.route('/uploadImage').post([auth, authorize('admin')], uploadImage);

router
  .route('/:id')
  .patch([auth, authorize('admin')], updateProduct)
  .delete([auth, authorize('admin')], deleteProduct)
  .get(getSingleProduct);

router.route('/:id/reviews').get(getSingleProductReview);

module.exports = router;
