const mongoose = require( "mongoose" )

// 'mongodb://127.0.0.1:27017/roughAge'
async function connectDB() {
    try {
        await mongoose.connect( process.env.MONGODB_URL );
        // const connection = mongoose.connection;

        // // Fetch the list of collections in the default database
        // const collections = await connection.db.listCollections().toArray();
        // console.log(collections)

    } catch ( error ) {
        console.error();
    }
}

module.exports = connectDB;