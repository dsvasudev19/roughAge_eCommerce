const {Product, Media}=require("../../models");
const {uuid}=require("uuidv4");


const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll({include: [
            {
                model: Media,
                as: "featuredImage",
            },
            {
                model: Media,
                as: "galleryImages"
            }
        ]});
        if(products.length===0) return res.status(404).json({success: false, message: "Products not found"});
        return res.status(200).json({success: true, data: products});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
}

const getProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.productId, {
            include: [
                {
                    model: Media,
                    as: "featuredImage",
                },
                {
                    model: Media,
                    as: "galleryImages"
                }
            ]
        });
        if(!product) return res.status(404).json({success: false, message: "Product not found"});
        return res.status(200).json({success: true, data: product});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
}
const addProduct=async(req,res)=>{
    try {
        if (!req.file) {
            return res.status(400).json({success: false, message: 'No file uploaded.'});
        }
        const product = await Product.create({...req.body,storeId:parseInt(req.body.storeId),productSlug:uuid(),productBrand:"roughage"}); 
        const imageURL = `./uploads/productMedia/${ req.file.filename }`;

        const fileDetails = {
            mediable_id: product.productId,
            mediable_type: 'Product',
            url: imageURL,
            name: req.file.originalname,
            file_name: req.file.filename,
            file_type: req.file.mimetype,
            file_size: req.file.size,
            featured: true
        };

        const newMedia = await Media.create(fileDetails);

        if (!newMedia) {
            return res.status(400).json({success: false, message: 'Error uploading file.'});
        }
        if(newMedia && product){
            return res.status(200).json({success: true, message: "Product added successfully", data: product});
        }
        return res.status(400).json({success: false, message: "Error adding product"});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
}



const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.productId);
        if(!product) return res.status(404).json({success: false, message: "Product not found"});
        await product.update(req.body, {where: {id: req.params.productId}});
        return res.status(200).json({success: true, message: "Product updated successfully"});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
}

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.productId);
        if(!product) return res.status(404).json({success: false, message: "Product not found"});
        await product.destroy({where: {id: req.params.productId}});
        return res.status(200).json({success: true, message: "Product deleted successfully"});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
}

const addProductProfile = async (req, res) => {
    
    try {
        if (!req.file) {
            return res.status(400).json({success: false, message: 'No file uploaded.'});
        }
        const product = await Product.findByPk(req.params.productId);
      
        if(!product) return res.status(404).json({success: false, message: "Product not found"});

        const imageURL = `./uploads/productMedia/${ req.file.filename }`;

        const fileDetails = {
            mediable_id: product.productId,
            mediable_type: 'Product',
            url: imageURL,
            name: req.file.originalname,
            file_name: req.file.filename,
            file_type: req.file.mimetype,
            file_size: req.file.size,
            featured: true
        };

        const oldMediaDestroy = await Media.destroy({where: {mediable_id: product.productId,mediable_type:"Product",featured:true}});

        

        const newMedia = await Media.create(fileDetails);

        if (!newMedia) {
            return res.status(400).json({success: false, message: 'Error uploading file.'});
        }
        return res.status(200).json({success: true, message: "Product profile added successfully", data: newMedia});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
}
const changeStatus=async(req,res)=>{
    try {
        const product = await Product.findByPk(req.params.productId);
        console.log(product);
        
        if(!product) return res.status(404).json({success: false, message: "Product not found"});

        const result=await Product.update({productStatus:req.body.status}, {where: {productId: req.params.productId}});

        return res.status(200).json({success: true, message: "Product status updated successfully"});

    } catch (error) {
        console.error(error.message);
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
}

module.exports = {
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    addProduct, addProductProfile, changeStatus
    
}