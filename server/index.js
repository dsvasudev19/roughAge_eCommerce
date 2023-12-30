require( "dotenv" ).config();
const express = require( "express" );
// const http = require( "http" );
// const WebSocket = require( "ws" );
const bodyParser = require( "body-parser" );
const cors = require( 'cors' );
const router = require( './router/route.js' )
const conn = require( './mongoDB.js/connect.js' )
const cookieParser = require( 'cookie-parser' )
const session=require('express-session');
const { mongo } = require( "mongoose" );

const app = express();
// const server = http.createServer( app );
// const wss = new WebSocket.Server( { server } );



app.use( cors() );
app.use( bodyParser.json( { limit: '2mb' } ) );
app.use( express.json( { limit: '10mb' } ) )
app.use( express.static( 'public' ) );
app.use( express.urlencoded( { limit: '2mb', extended: true } ) )
app.use( bodyParser.urlencoded( { limit: '10mb', extended: true } ) );
app.use( "/api", router )

app.use( cookieParser() )
app.use(
    session( {
        secret: process.env.SECRET, // Change this to a strong, random key
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days in milliseconds
        },
    } )
);
app.get( "/", ( req, res ) => {
    console.log(" / file from backend")
    res.send( "HELLO WELCOME" );
} )


conn()
    .then(
        console.log( `mongodb server started successfully...` )

    ).then(
        app.listen( 3001, function ( req, res ) {
            console.log( `server started on port number ${ process.env.PORT }` );
        } )
        // server.listen( PORT_NUM, () => {
        //     console.log( `Server started on port number ${ PORT_NUM }` );
        // } );
    )
    .catch( error => {
        console.log( "unable to start mongodb server." + error);
    } )


// const express = require( "express" );
// const app = express();
// PORT_NUM = 3001
// app.listen( PORT_NUM, function ( req, res ) {
//     console.log( `server started on port number ${ PORT_NUM }` );
// } )

module.exports=app;





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