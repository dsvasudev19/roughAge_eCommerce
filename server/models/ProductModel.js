const mongoose=require("mongoose")


// image: base64,
//     productID: null,
//         productName: null,
//             price: null,
//                 description: null,
//                     category: null,
//   });

const productSchema=new mongoose.Schema({
    image:{
        type:String,
        required:[true,"Image must be uploaded"]
    },
    productID:{
        type:String,
        required:[true,"ProductID is necessary"],
        unique:true
    },
    productName:{
        type:String,
        required:[true,"Product name couldn't be empty"]
    },
    price:{
        type:Number,
        required:[true,"Please provide the cost of the product"]
    },
    quantityAvailable:{
        type:Number,
        required:[true,"Please mention the Quantity of the Products"]
    },
    description:{
        type:String
    },
    category:{
        type:String,
        required:[true,"Category of the product must be provided"]
    }
}
);

module.exports = mongoose.model( 'Product', productSchema );