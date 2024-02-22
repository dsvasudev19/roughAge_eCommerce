const {Product,Profile,Media,Review,User}=require('../models');

const getProducts= async (req, res,next) => {
    try {
        const products = await Product.findAll({
            include: [
                
                {
                    model: Media,
                    as: "featuredImage"
                },{
                    model:Media,
                    as:"galleryImages"
                },{
                    model:Review,
                    include:[
                        {
                            model:User
                        }
                    ]
                }
            ]
        });
        res.json(products);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const getProductBySlug= async (req, res,next) => {
    try {
        const product = await Product.findOne({
            where:{
                productSlug:req.params.productSlug

            },
            include: [
                {
                    model: Media,
                    as: "featuredImage"
                },{
                    model:Media,
                    as:"galleryImages"
                },{
                    model:Review,
                    include:[
                        {
                            model:User
                        }
                    ]
                }
            ]
        });
        if(product){
            return res.status(200).json({success:false,message:"Successfully Fetched the Product",data:product})
        }
        return res.status(404).json({success:false,message:"Product Not Found"})
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findByPk(req.params.productId,{
            include: [
                {
                    model: Media,
                    as: "featuredImage"
                }, {
                    model: Media,
                    as: "galleryImages"
                }, {
                    model: Review,
                    include: [
                        {
                            model: User
                        }
                    ]
                }
            ]
        });
        if (product) {
            return res.status(200).json({success: false, message: "Successfully Fetched the Product", data: product})
        }
        return res.status(404).json({success: false, message: "Product Not Found"})
    } catch (error) {
        console.log(error);
        next(error);
    }
}


module.exports = {
    getProducts,
    getProductBySlug,
    getProductById
}