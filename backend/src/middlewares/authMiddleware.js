const {Staff} = require("../models");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {

  try {
    // const token =
    //   req.headers.authorization && req.headers.authorization.split(" ")[1];
    // console.log(req.session)
    // console.log(req.cookies)
    const token = req.cookies.token;
    // console.log(token);

    if (!token) {
      return res.status(401).json({success: false, message: "UnAuthorized... Token Not Found"});
    }

    const {userId, 
      // macId
    } = await jwt.verify(token, "abcdefghijk");
    // if(!macId) return res.status(401).json({success: false, message: "UnAuthorized...MAC ID not found"});

    // console.log(userId,macId,getmac)

    // if(macId !== getmac) return res.status(401).json({success: false, message: "UnAuthorized...MAC ID not matched"});

    if (!userId) {
      return res.status(401).json({success: false, message: "UnAuthorized...Token is not valid"});
    }
    const staff = await Staff.findByPk(userId);

    if (!staff) {
      return res.status(401).json({success: false, message: "UnAuthorized... Staff Not found"});
    }

    req.user = staff;

    res.cookie('token', token, { 
      httpOnly: false,
      sameSite: 'None',
      maxAge: 2*60*60*1000, // 2 hours
      secure: false // Only set this to true in production
    });
    res.setHeader('admin', JSON.stringify({
      ...staff
    }));

    next();
  } catch (error) {
    console.log(error.message);
    res.status(401).json({success: false, message: "Unauthorized....catch block"});
  }
};

module.exports = auth;
