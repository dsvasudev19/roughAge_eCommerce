const express = require('express');
const router = express.Router();

const staffController = require('../../controllers/Admin/staffController');

router.get("/",staffController.getStaffs);

router.get("/:staffId",staffController.getStaff);

router.post("/",staffController.createStaff);

router.put("/:staffId",staffController.updateStaff);

router.delete("/:staffId",staffController.deleteStaff);

module.exports = router;