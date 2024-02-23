const express = require("express");
const router = express.Router();
const supportController = require("../../controllers/Admin/supportController");

router.get("/", supportController.getAllSupportEnquiries);

router.get("/today/", supportController.getTodayEnquiries);

router.get("/:id",supportController.getSupportEnquiryById);

router.put("/:id",  supportController.updateSupportEnquiry);

router.delete("/:id", supportController.deleteSupportEnquiry);

module.exports = router;
