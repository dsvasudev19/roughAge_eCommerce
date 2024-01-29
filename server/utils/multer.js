const multer = require("multer");
const path = require("path");
const fs = require("fs")


const storage = multer.diskStorage({
    
    destination: (req, file, cb) => {
        
        if (!fs.existsSync("./uploads")) {
            fs.mkdirSync("./uploads")
        }
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        const uniqueString =
            Date.now() + "_" + crypto.randomBytes(5).toString("hex");
        cb(null, uniqueString);
    },
});

// Property media storage
const product_media = multer.diskStorage({
    destination: (req, file, cb) => {
        if (!fs.existsSync("./uploads/productMedia")) {
            fs.mkdirSync("./uploads/productMedia")
        }
        cb(null, "./uploads/productMedia");
    },
    filename: (req, file, cb) => {
        const uniqueString = Date.now() + "_" + path.extname(file.originalname);
        cb(null, "product_" + uniqueString);
    },
});



//room Media Storage
const profileMedia = multer.diskStorage({
    destination: (req, file, cb) => {
        if (!fs.existsSync("./uploads/profileMedia")) {
            fs.mkdirSync("./uploads/profileMedia")
        }
        cb(null, "./uploads/profileMedia")
    },
    filename: (req, file, cb) => {
        const uniqueString = Date.now() + "_" + path.extname(file.originalname);
        cb(null, "profileMedia_" + uniqueString);
    },
})


// filter for media type
function fileFilter(req, file, cb) {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Wrong file type"));
    }
}

const upload = multer({storage, fileFilter});

const productMediaUpload = multer({storage: product_media, fileFilter});

const profileMedialUpload = multer({storage: profileMedia, fileFilter});



module.exports = {
    upload,
    productMediaUpload,
    profileMedialUpload,
   
};
