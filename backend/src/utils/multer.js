const multer = require("multer");
const path = require("path");
const fs = require("fs");
const process = require("process");
const cwd = process.cwd();


if (!fs.existsSync('.//uploads')) {
      fs.mkdirSync('./uploads')
    }

const createDirIfNotExist = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    createDirIfNotExist("./uploads");

    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const uniqueString =
      Date.now() + "_" + crypto.randomBytes(5).toString("hex");
    cb(null, uniqueString);
  },
});

const profile_media = multer.diskStorage({
  destination: (req, file, cb) => {

    // if (!fs.existsSync("./uploads/profileMedia")) {
    //   fs.mkdirSync("./uploads/profileMedia")
    // }
    createDirIfNot("./uploads/profileMedia")


    cb(null, "./uploads/profileMedia");
  },
  filename: (req, file, cb) => {
    const uniqueString = Date.now() + "_" + path.extname(file.originalname);
    cb(null, "profile_" + uniqueString);
  },
});

const product_media = multer.diskStorage({
  destination: (req, file, cb) => {
    createDirIfNotExist("./uploads/productMedia");

    cb(null, "./uploads/productMedia");
  },
  filename: (req, file, cb) => {
    const uniqueString = Date.now() + "_" + path.extname(file.originalname);
    cb(null, "product_" + uniqueString);
  },
});

const category_media = multer.diskStorage({
  destination: (req, file, cb) => {

    createDirIfNotExist("./uploads/categoryMedia");

    cb(null, "./uploads/categoryMedia");
  },
  filename: (req, file, cb) => {
    const uniqueString = Date.now() + "_" + path.extname(file.originalname);
    cb(null, "category_" + uniqueString);
  },
});

const store_media = multer.diskStorage({
  destination: (req, file, cb) => {
    createDirIfNotExist("./uploads/storeMedia");

    cb(null, "./uploads/storeMedia");
  },
  filename: (req, file, cb) => {
    const uniqueString = Date.now() + "_" + path.extname(file.originalname);
    cb(null, "store_" + uniqueString);
  },
});

function fileFilter(req, file, cb) {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Wrong file type"));
  }
}

const upload = multer({ storage, fileFilter });

const profileMediaUpload = multer({ storage: profile_media, fileFilter });
const productMediaUpload = multer({ storage: product_media, fileFilter });
const categoryMediaUpload = multer({ storage: category_media, fileFilter });
const storeMediaUpload = multer({ storage: store_media, fileFilter });

module.exports = {
  upload,
  profileMediaUpload,
  productMediaUpload,
  categoryMediaUpload,
  storeMediaUpload,
}
