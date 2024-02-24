const multer = require("multer");
const path = require("path");
const aws = require("aws-sdk");
const crypto = require("crypto");

const createDirIfNotExist = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};

const s3 = new aws.S3({
  accessKeyId: "your_access_key",
  secretAccessKey: "your_secret_key",
  region: "your_region",
});

const storage = multer.memoryStorage(); // Use memory storage as we'll directly upload to S3

const uploadToS3 = (folder) => {
  return multer({
    storage: multer.memoryStorage(),
    fileFilter: fileFilter,
  }).single("file");
};

function fileFilter(req, file, cb) {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Wrong file type"));
  }
}

const upload = uploadToS3("uploads");
const profileMediaUpload = uploadToS3("uploads/profileMedia");
const productMediaUpload = uploadToS3("uploads/productMedia");
const categoryMediaUpload = uploadToS3("uploads/categoryMedia");
const storeMediaUpload = uploadToS3("uploads/storeMedia");

module.exports = {
  upload,
  profileMediaUpload,
  productMediaUpload,
  categoryMediaUpload,
  storeMediaUpload,
};
