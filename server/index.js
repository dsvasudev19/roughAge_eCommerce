require( "dotenv" ).config();
const express = require( "express" );

const bodyParser = require( "body-parser" );
const cors = require( 'cors' );
const router = require( './router/route.js' )
const conn = require( './mongoDB.js/connect.js' )
const cookieParser = require( 'cookie-parser' )
const session = require( 'express-session' );
const {productMediaUpload} = require( './utils/multer' )
const app = express();


// app.use( cors( {
//     origin: 'https://roughage.vercel.app',
//     methods: 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
//     allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
// } ) );

app.use(cors({
    origin: [ "http://localhost:3000", "https://roughage.vercel.app", "https://roughage-api.vercel.app", "http://localhost:3001" ]
}));

app.use( bodyParser.json( { limit: '2mb' } ) );
app.use( express.json( { limit: '10mb' } ) )
app.use( express.static( 'public' ) );
app.use( express.urlencoded( { limit: '2mb', extended: true } ) )
app.use( bodyParser.urlencoded( { limit: '10mb', extended: true } ) );
app.use( "/api", router )

app.use( cookieParser() )
app.use(
    session( {
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days in milliseconds
        },
    } )
);
app.get( "/", ( req, res ) => {
    console.log( " / file from backend" )
    res.send( "HELLO WELCOME" );
} )
app.post("/sendMail",(req,res)=>{
    console.log("what re");
})
app.post("/fileUpload", productMediaUpload.single("productMedia"),(req,res)=>{
    const imageUrl=`http://localhost:3001/uploads/productMedia${req.file.path}`
    console.log(imageUrl);
})
conn()
    .then(
        console.log( `mongodb server started successfully...` )

    ).then(
        app.listen( 3001, function ( req, res ) {
            console.log( `server started on port number ${ process.env.PORT }` );
        } )

    )
    .catch( error => {
        console.log( "unable to start mongodb server." + error );
    } )




module.exports = app;





// {
//     "version": 2,
//         "builds": [
//             {
//                 "src": "./app.js",
//                 "use": "@vercel/node"
//             }
//         ],
//             "routes": [
//                 {
//                     "src": "/(.*)",
//                     "dest": "/"
//                 },
//                 {
//                     "src": "/",
//                     "dest": "/"
//                 }
//             ]
// }