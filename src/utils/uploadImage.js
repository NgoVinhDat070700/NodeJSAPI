const path = require("path");
const multer = require("multer");
var Storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  },
});
var upload = multer({
  storage: Storage,
}).single("image");
module.exports = upload;
