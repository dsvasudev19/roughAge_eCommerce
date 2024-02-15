const express = require('express');
const router = express.Router();

const profileMediaController = require('../../controllers/Admin/profileMediaController');
const {profileMediaUpload}= require('../../utils/multer');

router.post("/:userId", profileMediaUpload.single("profileImage"), profileMediaController.uploadProfileImage);



router.post("/store/:storeId", profileMediaUpload.array("storeImage",10), profileMediaController.uploadStoreImages);



module.exports = router;