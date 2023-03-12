const { StatusCodes } = require('http-status-codes');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const uploadProductImage = async (req, res) => {
  const productImage = req.files.file.tempFilePath;
  const img = await cloudinary.uploader.upload(productImage, {
    use_filename: true,
  });

  fs.unlinkSync(productImage);
  res.status(StatusCodes.CREATED).json({ image: { src: img.secure_url } });
};

module.exports = { uploadProductImage };
