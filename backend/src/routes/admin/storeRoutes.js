const express = require('express');
const router = express.Router();
const storeController = require('../../controllers/Admin/storeController');
const {storeMediaUpload} = require('../../utils/multer');

router.get("/",storeController.getStores);

router.get("/:storeId",storeController.getStore);

router.post("/",storeMediaUpload.single("storeImage"),storeController.createStore);

router.put("/:storeId",storeMediaUpload.single("storeImage"),storeController.updateStore);

router.delete("/:storeId",storeController.deleteStore);

router.put("/status/:storeId",storeController.changeStatus);

module.exports = router;
