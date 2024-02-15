const express = require('express');
const router = express.Router();
const {productMediaUpload}= require('../../utils/multer');
const productController=require("../../controllers/Admin/productController");

router.get("/", productController.getAllProducts);

router.get("/:productId", productController.getProduct);

router.post("/", productMediaUpload.single("productImage"), productController.addProduct);

router.post("/profile/:productId", productMediaUpload.single("productImage"), productController.addProductProfile);

router.put("/:productId", productController.updateProduct);

router.put("/status/:productId", productController.changeStatus);

router.delete("/:productId", productController.deleteProduct);

module.exports = router;


