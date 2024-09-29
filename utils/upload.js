const cloudinary = require('cloudinary').v2;
const Images = require('../models/Images');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImages = async (filePath, folderName) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folderName,
    });
    const body = {
      imageUrl: result.secure_url,
      publicId: result.public_id,
    };
    await Images.create(body);
    return result.secure_url;
  } catch (err) {
    console.log('error uploading file', err);
  }
};

const deleteImages = async (url, resourceType = 'image') => {
  try {
    let image = await Images.findOneAndDelete({ imageUrl: url });
    const result = await cloudinary.uploader.destroy(image.publicId, {
      resource_type: resourceType,
    });
    if (result.result === 'ok') {
      await Images.findOneAndDelete({ imageUrl: url });
    }
    return result;
  } catch (err) {
    console.log('error deleting file', err);
  }
};

module.exports = { uploadImages, deleteImages };
