const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

// Define the Cart Item schema
const cartItemSchema = new Schema( {
    itemName: String,
    quantity: Number,
    price: Number
    
} );

// Define the Address schema
const addressSchema = new Schema( {
    name: String,
    city: String,
    age: Number,
    mobile: String
    
} );

// Define the Order schema
const orderSchema = new Schema( {
    
    address: addressSchema,
    cartData: [ cartItemSchema ],
    orderDate: { type: Date, default: Date.now },
} );

// Create the Order model
const Order = mongoose.model( 'Order', orderSchema );

// Export the Order model for use in other files
module.exports = mongoose.model.Order || Order;
