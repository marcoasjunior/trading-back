var cloudinary = require('cloudinary');
var cloudinaryStorage = require('multer-storage-cloudinary');
require('./cloudinary')()

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'docs',
  filename: function (req, file, cb) {
    cb(null, file.originalname + '-' + Date.now())
  }
})

module.exports = storage