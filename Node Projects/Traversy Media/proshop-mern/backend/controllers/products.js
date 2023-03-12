import Product from '../models/Product.js';

const getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json({ success: true, products });
};

const getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error(`Product not found with the id : ${req.params.id}`);
  }

  res.status(200).json({ success: true, product });
};

export { getAllProducts, getProduct };
