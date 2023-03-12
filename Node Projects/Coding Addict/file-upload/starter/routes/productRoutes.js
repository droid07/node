const express = require('express');
const {
  addProduct,
  getAllProducts,
} = require('../controllers/productController');
const { uploadProductImage } = require('../controllers/uploadsController');
const router = express.Router();

router.route('/').post(addProduct).get(getAllProducts);
router.route('/uploads').post(uploadProductImage);

module.exports = router;
