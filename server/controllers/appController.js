
const User = require( '../models/userModel.js' )
const Product=require("../models/ProductModel.js");
// const Product = require( '../models/ProductModel.js' )
const bcrypt = require( 'bcrypt' )
const session=require('express-session')


let cart = [];
async function establishSession(req,res){

}
async function addToCart( req, res ) {
    const { productID } = req.body;

    //first check whether cart is empty or any product is present in the cart
    //if the cart is empty directly add the product to the cart 
    if ( cart.length === 0 ) {
        Product.findOne( { productID} )
            .then( product => {
                product.quantityAvailable=undefined;
                let cartProduct = { ...product._doc, count: 1 }
                cart.push( cartProduct );
            } )

        res.status( 201 ).json( {
            message: "successfully added to the cart..."
        } ).send();
    }
    //if the cart is not empty then check for the product and proceed accordingly
    else {

        let cartProduct = cart.find( product => product.productID == productID );
        if ( cartProduct ) {
            cartProduct.count += 1;
        }
        // if product doesn't exist in cart extend it to cart
        else {
            Product.findOne( { productID: productID } ).then( newProduct => {
                let toAddProduct = { ...newProduct._doc, count: 1 };
                cart.push( toAddProduct );
            } )
        }

    }
    //find whether the product is already in cart

    res.status( 201 ).send();
}

async function addToCartProductId( req, res ) {

    const { id, quantity } = req.body;

    if ( cart.length === 0 ) {
        Product.findOne( { productID: id } ).then(product=>{
            if(product){
                product.quantityAvailable = undefined;
                let cartProduct = { ...product._doc, count: quantity }
                cart.push( cartProduct );
                res.status(202).json({msg:"Successfully added."});
            }
            else{
                res.status(404).json({msg:"Product Not Found"});
            }
        }
        ).catch(error=>{
            res.status(404);
        })
    }
    else {
        var productPresent = cart.find( product => product.productID == id );
        if ( productPresent ) {

            productPresent.count += quantity;

            res.status(202).json({msg:"Successfully added."})
        } else {
            Product.findOne( { productID: id } ).then( product => {
                if ( product ) {
                    let cartProduct = { ...product._doc, count: quantity }
                    cart.push( cartProduct )
                    res.status(202).json({msg:"Successfully added"})
                }
                else {
                    res.status( 404 ).json({msg:"Product Not found"});
                }
            }
            ).catch( error => {
                res.status( 404 );
            } )
        }
    }
}

async function getProducts( req, res ) {
    await Product.find({}).then( products => {
        // console.log(products)
        res.status( 200 ).json( products )
    } ).catch( err => res.json( err ) );

}
async function authenticate( req, res ) {

}
async function createUser( req, res ) {

}
async function deleteProduct( req, res ) {
    const { id } = req.body;
    var newCart = cart.filter( product => product.productID !== id );
    cart = newCart;
    res.status( 200 ).json( newCart ).send();
}

async function getProductDetails(req,res){
    const id = req.params.productId;
    Product.find({productID:id}).then(
        product=>{
            if(product){
                res.status(202).json(product);
            }else{
                res.status(404).json({msg:"No Product Found"})
            }
        }
    )
}

async function getCart( req, res ) {

    await res.json( cart );

}
async function updateCart( req, res ) {
    const { id, quantity } = req.body;
    cart.find( pro => {
        if ( pro.productID === id ) {
            pro.count = quantity;
        }
    } )
    res.status( 200 ).json( {
        message: "succesfully updated"
    } ).send();
}

async function setCart( req, res ) {
    const cartData=req.body;
    // console.log(cartData);
    req.cart=cartData;
    
    res.status(202).json({msg:'success'});
}

async function registerUser( req, res ) {

    const userData = req.body;
    userData.confirmPassword = null;

    bcrypt.hash( userData.password, 10, function ( err, hash ) {

        userData.password = hash;

        User.create( { ...userData, password: hash } )
            .then( ( registeredUser ) => {
                res
                    .status( 202 )
                    .json( {
                        message: "Success",
                    } )
                    .send();
            } )
            .catch( ( error ) => {
                console.log(
                    "Some Technical error occured during creation of new user..  Please try later"
                );
                console.log( error );
            } );
    } )
}

async function registerProduct( req, res ) {
    const productData = req.body;

    Product.create( req.body ).then( ( success ) => {
        res.status( 203 ).json( {
            msg: "Success",
            suggestion: "Try compressing the image"
        } ).send();
    } ).catch( error => {
        console.log( error );
    } )

}

async function getSimilarCategoryProducts(req,res){
    const {category}=req.body;
    const products=await Product.find({category})
    if(products.length>0){
        res.status(202).json({products})
    }else{
        res.status(404).json({msg:"Failed to fetch products"})
    }
}


async function setUser(req,res){
    const UserData=req.body;
    // console.log(UserData);
    UserData.cart.map(userCart=>{
        userCart.image=undefined;
        userCart.description=undefined;
        delete userCart.image;
        delete userCart.description;
    })
    const newOrder=UserData;

    // console.log(UserData);
    req.User=UserData;
}


module.exports = { getCart, addToCart, addToCartProductId, updateCart, deleteProduct, setCart, registerUser, registerProduct, getProducts, getProductDetails, getSimilarCategoryProducts, setUser, establishSession };
// exports.getCart=getCart;
// exports.addToCart=addToCart;
// exports.addToCartProductId=addToCartProductId;
// exports.updateCart=updateCart;
// exports.deleteProduct = deleteProduct;
// exports.setCart = setCart;
