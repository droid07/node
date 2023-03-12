const Product = require('../models/Product');
const Review = require('../models/Review');
const CustomError = require('../errors');
const { StatusCodes } = require('http-status-codes');
const checkPermissions = require('../utils/checkPermissions');

const getAllReviews = async (req, res) => {
  const reviews = await Review.find({})
    .populate({
      path: 'product',
      select: 'name company price',
    })
    .populate({
      path: 'user',
      select: 'name',
    });
  res.status(StatusCodes.OK).json({ sucess: true, reviews });
};

const getSingleReview = async (req, res) => {
  const review = await Review.findById(req.params.id)
    .populate({
      path: 'product',
      select: 'name company price',
    })
    .populate({
      path: 'user',
      select: 'name',
    });

  if (!review) {
    throw new CustomError.NotFoundError('Review not found');
  }

  res.status(StatusCodes.OK).json({ sucess: true, review });
};

const createReview = async (req, res) => {
  req.body.user = req.user.userId;

  const { product } = req.body;

  const isValidProduct = await Product.findOne({ _id: product });

  if (!isValidProduct) {
    throw new CustomError.NotFoundError(`No product with id : ${product}`);
  }

  const review = await Review.create(req.body);
  res.status(StatusCodes.CREATED).json({ sucess: true, review });
};

const updateReview = async (req, res) => {
  const { rating, title, comment } = req.body;

  const review = await Review.findOne({ _id: req.params.id });

  if (!review) {
    throw new CustomError.NotFoundError(`No review with id : ${req.params.id}`);
  }

  checkPermissions(req.user, review.user);

  review.rating = rating;
  review.title = title;
  review.comment = comment;

  await review.save();

  res.status(StatusCodes.OK).json({ success: true, review });
};

const deleteReview = async (req, res) => {
  const review = await Review.findOne({ _id: req.params.id });

  if (!review) {
    throw new CustomError.NotFoundError('Review not found');
  }

  checkPermissions(req.user, review.user);

  await review.remove();

  res.status(StatusCodes.OK).json({ sucess: true, msg: 'review deleted' });
};

const getSingleProductReview = async (req, res) => {
  const reviews = await Review.find({ product: req.params.id });
  res.status(StatusCodes.OK).json({ success: true, reviews });
};

module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
  getSingleProductReview,
};
