const cloudinary = require("cloudinary").v2;
require("dotenv").config();

const opt = cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

const cb = () => {
  // empty callback
}

function imgUpload(file) {
  cloudinary.uploader.upload(file, opt, 
    function(error, result) {console.log(result, error)});
}

function imgDelete(file) {

}

module.exports = { cloudinary, imgUpload, imgDelete }

