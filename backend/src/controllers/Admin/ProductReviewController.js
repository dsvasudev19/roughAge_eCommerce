const {Review,User} = require('../../models');
const {Product} = require('../../models');
const getGlobalReviews = async (req, res,next) => {
    try {
        const reviews = await Review.findAll({include:[
        {
            model: User,
            attributes: ['first_name','last_name','email','phone']
        },
        {
            model: Product,
            attributes: ['name','price','description','category']
        }
        ]});
        if(reviews.length>0){
            return res.status(200).json({success: true, data: reviews, message: "Successfully fetched all reviews"});
        }
        return res.status(404).json({message: "No reviews found",success:false});
    } catch (error) {
        next(error);
    }
};

const createProductReview = async (req, res,next) => {
    try {
        const productId = req.params.productId;
        // const userId=req.user.id;
        const {rating, content,userId} = req.body;
        console.log(req.params);
        console.log(req.body)
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({success: false, message: 'Product not found'});
        }else{
            const newReview = await Review.create({
                userId,
                reviewable_id:productId,
                reviewable_type:'Product',
                rating,
                content
            });
            if(newReview){
                return res.status(201).json({success: true, message: 'Review created successfully', data: newReview});
            }
            return res.status(400).json({success: false, message: 'Review creation failed'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: 'Internal Server Error', error: error.message});
    }
}

const getReviewById= async (req, res,next) => {
    try {
        const review = await Review.findByPk(req.params.reviewId);
        if (review) {
            return res.status(200).json({success: true, data: review,message:"Successfully fetched review"});
        } else {
            return res.status(404).json({error: "Review not found"});
        }
    } catch (error) {
        next(error);
    }
};

const getAllReviews= async (req, res,next) => {
    try {
        const reviews = await Review.findAll({
            where:{
                reviewable_id:req.params.productId,
            }
        });
        if(reviews.length>0){
            return res.status(200).json({success: true, data: reviews, message: "Successfully fetched all reviews"});
        }
        return res.status(404).json({message: "No reviews found",success:false});
    } catch (error) {
        next(error);
    }
}

const updateReview= async (req, res,next) => {
    try {
        const review = await Review.findByPk(req.params.reviewId);
        if (review) {
            const updatedReview=await Review.update(req.body,{
                where:{
                    id:req.params.reviewId
                }
            });
            return res.status(200).json({success: true, data: review,message:"Successfully updated review"});
        } else {
            return res.status(404).json({error: "Review not found"});
        }
    } catch (error) {
        next(error);
    }
}

const deleteReview= async (req, res,next) => {
    try {
        const review = await Review.findByPk(req.params.reviewId);
        if (review) {
            await Review.destroy({
                where:{
                    id:req.params.reviewId
                }
            });
            return res.status(200).json({success: true, message: 'Review removed'});
        } else {
            return res.status(404).json({error: "Review not found"});
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createProductReview,
    getReviewById,
    getAllReviews,
    updateReview,
    deleteReview,
    getGlobalReviews
};