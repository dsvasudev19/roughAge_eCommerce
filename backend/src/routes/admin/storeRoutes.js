const express = require('express');
const router = express.Router();
const storeController = require('../../controllers/Admin/storeController');

router.get("/",storeController.getStores);

router.get("/:storeId",storeController.getStore);

router.post("/",storeController.createStore);

router.put("/:storeId",storeController.updateStore);

router.delete("/:storeId",storeController.deleteStore);

router.put("/status/:storeId",storeController.changeStatus);

module.exports = router;
