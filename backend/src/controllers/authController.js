const {Staff, RefreshToken} = require("../models");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");


const login = async (req, res, next) => {
    console.log("getting here")
    try {
        let {email, password} = req.body;
        const user = await User.findOne({where: {email}});

        if (!user) {
            return res
                .status(401)
                .json({success: false, message: "Invalid username or password"});
        }

        let valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return res
                .status(401)
                .json({success: false, message: "Invalid username or password"});
        }

        let accessToken = await jwt.sign({
            userId: user.id
        }, "abcdefghijk", {
            expiresIn: "180s",
        });

        const refreshToken = await RefreshToken.createToken(user);

        res.cookie('token', accessToken, {
            httpOnly: false,
            sameSite: 'None',
            maxAge: 2 * 60 * 1000, 
            secure: false 
        });
        req.user = user;

        res.status(200).cookie('token', accessToken).json({
            accessToken, refreshToken,
        }).send();
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};


const refreshTokenHandler = async (req, res, next) => {
    try {
        const {refreshToken} = req.body;

        const refToken = await RefreshToken.findOne({
            where: {token: refreshToken},
        });

        if (!refToken) {
            return res
                .status(401)
                .json({success: false, message: "Invalid refresh token"});
        }


        if (refToken.expiry_date < Date.now()) {
            return res
                .status(401)
                .json({success: false, message: "Refresh token has expired"});
        }

        const accessToken = await jwt.sign(
            {userId: refToken.userId},
            "abcdefghijk"
        );

        res.status(200).json({
            accessToken,
        });
    } catch (error) {
        console.error(error.message);
        next(error);
    }
};


const getUserByToken = async (req, res, next) => {

    const token = req.body.accessToken;
    
    if (!token) {
        return res.status(401).json({success: false, message: "UnAuthorized"});
    }

    const {userId} = await jwt.verify(token, "abcdefghijk");

    if (!userId) {
        return res.status(401).json({success: false, message: "UnAuthorized"});
    }
    const user = await User.findByPk(userId);

    if (!user) {
        return res.status(401).json({success: false, message: "UnAuthorized"});
    }

    return res.status(200).json({success: true, message: "Authorized", data: user});

}

module.exports = {login, refreshTokenHandler, getUserByToken};
