const express = require('express');
const router = express.Router();

const enquiryController = require('../../controllers/Admin/enquiryController');

router.get('/enquiries', enquiryController.getAllEnquiries);

router.get('/enquiries/:enquiryId', enquiryController.getEnquiry);

router.put('/enquiries/:enquiryId', enquiryController.updateEnquiry);

router.delete('/enquiries/:enquiryId', enquiryController.deleteEnquiry);

module.exports = router;

