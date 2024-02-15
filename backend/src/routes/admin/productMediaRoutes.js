
const express = require('express');
const router = express.Router();
const {productMediaUpload}= require('../../utils/multer');
const productMediaController = require('../../controllers/Admin/productMediaController');

router.post("/:productId", productMediaUpload.single("productImage"), productMediaController.uploadSingleImage);


router.post("/multiple/:productId",productMediaUpload.array("productImage", 10), productMediaController.uploadMultipleImages);


module.exports = router;
