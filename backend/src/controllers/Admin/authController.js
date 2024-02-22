const {Staff, RefreshToken} = require("../../models");

const bcrypt = require("bcrypt");
// const {default: getMAC} = require("getmac");
const jwt = require("jsonwebtoken");
// const getMAC = require("getmac").default;

/**
 * @swagger
 * /admin/login:
 *   post:
 *     tags:
 *      - Authentication
 *     summary: Authenticate staff or admin
 *     description: Endpoint to authenticate a staff or admin and generate access and refresh tokens.
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: credentials
 *         description: Staff or admin credentials (email and password)
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               description: Email of the staff or admin
 *             password:
 *               type: string
 *               description: Password of the staff or admin
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               default: true
 *             message:
 *               type: string
 *               default: Logged in successfully
 *             data:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: JWT access token
 *                 refreshToken:
 *                   type: string
 *                   description: Refresh token
 *       401:
 *         description: Invalid username or password
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               default: false
 *             message:
 *               type: string
 *               default: Invalid username or password
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               default: false
 *             message:
 *               type: string
 *               default: Internal Server Error
 *
 * @param {object} req.body - Staff or admin credentials (email and password)
 * @param {string} req.body.email - Email of the staff or admin
 * @param {string} req.body.password - Password of the staff or admin
 * @param {object} res - Express response object
 * @param {function} next - Express next middleware function
 * @returns {object} JSON response
 * @throws {object} Error object
 */
const login = async (req, res, next) => {
    console.log("getting here")
    try {
        let {email, password} = req.body;
        
        const staff = await Staff.findOne({where: {email}});
        if (!staff) {
            return res
                .status(401)
                .json({success: false, message: "Invalid username or password"});
        }

        let valid = await bcrypt.compare(password, staff.password);
        if (!valid) {
            return res
                .status(401)
                .json({success: false, message: "Invalid username or password"});
        }

        let accessToken = await jwt.sign({userId: staff.id
            // , macId: getMAC()
        }, "abcdefghijk", {
            expiresIn: "1200s",
        });

        const refreshToken = await RefreshToken.createToken(staff);

        res.cookie('token', accessToken, {
            httpOnly: false,
            sameSite: 'None',
            maxAge: 2 * 60 * 60 * 1000, // 2 hours
            secure: false // Only set this to true in production
        });
        req.staff = staff;



        res.status(200).cookie('token', accessToken).json({
            accessToken, refreshToken,
        }).send();
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};


/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: Endpoints related to user authentication

 * /admin/refresh-token:
 *   post:
 *     summary: Refresh Access Token
 *     description: Endpoint to refresh the access token using a valid refresh token.
 *     tags:
 *       - Authentication
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: refreshToken
 *         description: The refresh token used to generate a new access token.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             refreshToken:
 *               type: string
 *     responses:
 *       200:
 *         description: Access token refreshed successfully
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               default: true
 *             message:
 *               type: string
 *               default: Access token refreshed successfully
 *             accessToken:
 *               type: string
 *               description: New JWT access token
 *       401:
 *         description: Invalid refresh token or expired refresh token
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               default: false
 *             message:
 *               type: string
 *               default: Invalid refresh token or expired refresh token
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               default: false
 *             message:
 *               type: string
 *               default: Internal Server Error
 *
 * @param {object} req.body - Request body containing the refresh token.
 * @param {string} req.body.refreshToken - The refresh token to refresh the access token.
 * @param {object} res - Express response object
 * @param {function} next - Express next middleware function
 * @returns {object} JSON response
 * @throws {object} Error object
 */
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


const getStaffByToken = async (req, res, next) => {

    
    const token = req.body.accessToken;

    if (!token) {
        return res.status(401).json({success: false, message: "UnAuthorized"});
    }

    const {userId} = await jwt.verify(token, "abcdefghijk");

    if (!userId) {
        return res.status(401).json({success: false, message: "UnAuthorized"});
    }
    const staff = await Staff.findByPk(userId);

    if (!staff) {
        return res.status(401).json({success: false, message: "UnAuthorized"});
    }

    return res.status(200).json({success: true, message: "Authorized", data: staff});

}

module.exports = {login, refreshTokenHandler, getStaffByToken};
