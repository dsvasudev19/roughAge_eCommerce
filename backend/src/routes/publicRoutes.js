const express = require('express');
const router = express.Router();

const publicController = require('../controllers/publicController');

router.get('/', publicController.getProducts);

router.get('/:productId', publicController.getProductById);

router.get("/product/:productSlug", publicController.getProductBySlug);

// router.get('/categories', publicController.getCategories);

// router.get('/categories/:categoryId', publicController.getCategory);

// router.get('/products/category/:categoryId', publicController.getProductsByCategory);

// router.get('/products/brand/:brandId', publicController.getProductsByBrand);

// router.get('/brands', publicController.getBrands);

// router.get('/brands/:brandId', publicController.getBrand);

// router.get('/products/search/:search', publicController.searchProducts);

// router.post("/enquiry/:userId", publicController.enquiry);



module.exports = router;