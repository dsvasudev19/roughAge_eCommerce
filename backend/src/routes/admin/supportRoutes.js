const express = require("express");
const router = express.Router();
const supportController = require("../../controllers/Admin/supportController");

router.get("/", supportController.getAllSupportEnquiries);

router.get("/today/", [auth], supportController.getTodayEnquiries);

router.get("/:id", [auth], supportController.getSupportEnquiryById);

router.put("/:id", [auth], supportController.updateSupportEnquiry);

router.delete("/:id", supportController.deleteSupportEnquiry);

module.exports = router;
