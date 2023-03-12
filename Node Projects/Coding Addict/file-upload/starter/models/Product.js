const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name must be given'],
  },
  price: {
    type: Number,
    required: [true, 'Product price must be given'],
  },
  image: {
    type: String,
    required: [true, 'Image name must be given'],
  },
});

module.exports = mongoose.model('Product', ProductSchema);
