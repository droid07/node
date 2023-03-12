const Product = require('../models/Product');
const CustomError = require('../errors');
const { StatusCodes } = require('http-status-codes');
const path = require('path');

const getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.status(StatusCodes.OK).json({ success: true, products });
};

const getSingleProduct = async (req, res) => {
  const product = await Product.findById(req.params.id).populate({
    path: 'reviews',
    select: 'rating title comment',
  });

  if (!product) {
    throw new CustomError.NotFoundError('Product not found');
  }

  res.status(StatusCodes.OK).json({ sucess: true, product });
};

const createProduct = async (req, res) => {
  req.body.user = req.user.userId;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ sucess: true, product });
};

const updateProduct = async (req, res) => {
  const { id: productId } = req.params;

  const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    throw new CustomError.NotFoundError(`No product with id : ${productId}`);
  }

  res.status(StatusCodes.OK).json({ success: true, product });
};

const deleteProduct = async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });

  if (!product) {
    throw new CustomError.NotFoundError('Product not found');
  }

  await product.remove();

  res.status(StatusCodes.OK).json({ sucess: true, msg: 'Product removed' });
};

const uploadImage = async (req, res) => {
  if (!req.files) {
    throw new CustomError.BadRequestError('Please upload the image');
  }

  const image = req.files.image;

  if (!image.mimetype.startsWith('image')) {
    throw new CustomError.BadRequestError(
      `Please upload only : '.jpg', '.png or '.jpeg' formats`
    );
  }

  if (image.size > process.env.MAX_FILE_UPLOAD) {
    throw new CustomError.BadRequestError(
      `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`
    );
  }

  const uploadPath = path.resolve('public', 'uploads', image.name);

  image.mv(uploadPath, (err) => {
    if (err) {
      throw new CustomError.BadRequestError('Please upload the image');
    }
    return res
      .status(StatusCodes.OK)
      .json({ success: true, img: `/uploads/${image.name}` });
  });
};

module.exports = {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
