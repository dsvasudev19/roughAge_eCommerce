const router = require("express").Router();
const authController=require('../../controllers/Admin/authController')

router.post("/login", authController.login);

router.post("/refresh", authController.refreshTokenHandler);

// router.post("/logout", authController.logout);
router.post("/getByToken", authController.getStaffByToken);

module.exports = router;
