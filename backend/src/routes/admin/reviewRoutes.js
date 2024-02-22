const express = require('express');
const router = express.Router();


const reviewController = require('../../controllers/Admin/ProductReviewController');

router.get("/",reviewController.getGlobalReviews);

router.get("/product/:productId",reviewController.getAllReviews);

router.get("/:reviewId",reviewController.getReviewById);

router.post("/:productId",reviewController.createProductReview);

router.put("/:reviewId",reviewController.updateReview);

router.delete("/:reviewId",reviewController.deleteReview);

module.exports = router;