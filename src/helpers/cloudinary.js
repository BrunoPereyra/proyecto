const cloudinary = require('cloudinary').v2;
const { CLOUDINARY } = require("../config")
cloudinary.config({
    cloud_name: CLOUDINARY.CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY.CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY.API_SECRET
  });
module.exports = {cloudinary}
  