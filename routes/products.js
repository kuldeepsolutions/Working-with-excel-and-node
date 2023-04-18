const Product = require('../constrollers/products');
const router = require("express").Router();
// const middleware = require('../global/fileUploader');
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post("/upload-file", upload.array("file", 2), Product.fileUploader);
router.post("/read-file", Product.fileReader);

module.exports = router;
