const express = require( "express" )
const router = express.Router();
const controller = require( '../controllers/appController' );
const authenticator = require( '../Authentication/auth' )

router.route( '/addToCart' ).post( controller.addToCart )
// router.route('/authenticate').post(controller.authenticate)
// router.route('/createUser').post(controller.createUser)
router.route( '/addToCart/:productId' ).post( controller.addToCartProductId )

// router.route('/updateCart').post(controller.updateCart)

router.route( "/deleteProduct" ).delete( controller.deleteProduct )

router.route( '/updateCart' ).post( controller.updateCart )
router.route( '/setCart' ).post( controller.setCart );
router.route( "/register" ).post( controller.registerUser )
router.route( "/getSimilarCategoryProducts" ).post( controller.getSimilarCategoryProducts )
router.route("/setUser").post(controller.setUser);

//support mail route
router.route("/sendMail").post(controller.sendSupportMail)



//get routes
router.route( '/getProducts' ).get( controller.getProducts )
router.route( '/getProductDetails/:productId' ).get( controller.getProductDetails )
router.route( "/getCart" ).get( controller.getCart )
router.route('/establishSession').get(controller.establishSession);
router.route( "/admin/registerProduct" ).post( controller.registerProduct );


// router.route( "/contactMailer" ).post( controller.contactMailer )

//Authentication routes


router.route( '/auth/logoutAdmin' ).post( authenticator.logoutAdmin );
router.route( '/auth/authenticateAdmin' ).post( authenticator.authenticateAdmin )

//inventory route
router.route( "/getAllInventoryProducts" ).get( controller.getAllInventoryProducts );

//get routes 

router.route( "/auth/validateAdminAuthenctication" ).post( authenticator.validateAdminAuthenctication )





//update routes (put methods)

router.route( "/admin/updateProduct/:productID" ).put( controller.updateProductDetails )


module.exports = router;

