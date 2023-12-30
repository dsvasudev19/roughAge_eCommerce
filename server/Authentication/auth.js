const Admin = require( '../models/AdminModel' )
const bcrypt = require( 'bcrypt' )
const jwt = require( 'jsonwebtoken' )
const cookie = require( 'cookie-parser' )

//http://192.168.1.68:3000
async function authenticateAdmin( req, res ) {

    const { email, adminId, password } = req.body;
    await Admin.findOne( { adminId }).then( admin => {
        if ( admin.email === email ) {
            bcrypt.compare( password, admin.password )
                .then( result => {
                    if ( result ) {
                        var token = jwt.sign(
                            {
                                adminId: adminId, email: email
                            },
                            process.env.SECRET,
                            {
                                algorithm:'HS256',
                                expiresIn: '2h'
                            } )
                        res.status( 200 ).json( { token: token, msg: "Authentication Successfull" } );
                    } else {
                        res.status( 400 ).json( { msg: "Wrong Credentials" } );

                    }
                } )
        }
    } )

}
async function validateAdminAuthenctication( req, res ) {
    // const {token} = req.body;
    console.log("validation function")
    const {token} = req.body;
    jwt.verify( token, process.env.SECRET, async ( err, result ) => {
        if ( result ) {
            console.log(result);
            
            res.status( 205 ).json( { token: token, verification: "success" ,data:adminInformation} );
        } if ( err ) {
            res.status( 401 ).json( { message: "token Expired" } );
        }
    } )
}

async function logoutAdmin(req,res){
    const {token}=req.body;
    jwt.verify(token,process.env.SECRET,(err,result)=>{
        if(err){
            res.status(401).json({msg:"Invalid Authorization"});
        }else{
            var old_token = jwt.sign( { ...result, exp: Math.floor( Date.now() / 1000 ) - 30 },process.env.SECRET,{algorithm:'HS256'});
            res.status(206).json({token:old_token,msg:"successfully loggedout"});
        }
    })

}

module.exports = { authenticateAdmin, validateAdminAuthenctication, logoutAdmin }