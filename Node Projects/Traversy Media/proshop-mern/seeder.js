import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';

import Product from './backend/models/Product.js';
import User from './backend/models/User.js';
import products from './backend/data/products.js';
import users from './backend/data/users.js';

dotenv.config();

mongoose.connect(process.env.DB_URL);

const importData = async () => {
  try {
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });
    await Product.create(sampleProducts);
    console.log('data imported...'.green);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

const deleteData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    console.log('data deleted...'.red);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
