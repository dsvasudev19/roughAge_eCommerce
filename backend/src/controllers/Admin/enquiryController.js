const {Enquiry} = require('../../models/');

const getAllEnquiries = async (req, res) => {    
    try {
        const enquiries = await Enquiry.findAll({});
        if(enquiries.length===0) return res.status(404).json({success: false, message: "Enquiries not found"});
        return res.status(200).json({success: true, data: enquiries});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
}

const getEnquiry = async (req, res) => {
    try {
        const enquiry = await Enquiry.findByPk(req.params.enquiryId);
        if(!enquiry) return res.status(404).json({success: false, message: "Enquiry not found"});
        return res.status(200).json({success: true, data: enquiry});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
}

const updateEnquiry = async (req, res) => {
    try {
        const enquiry = await Enquiry.findByPk(req.params.enquiryId);
        if(!enquiry) return res.status(404).json({success: false, message: "Enquiry not found"});
        await enquiry.update(req.body, {where: {id: req.params.enquiryId}});
        return res.status(200).json({success: true, message: "Enquiry updated successfully"});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
}

const deleteEnquiry = async (req, res) => {
    try {
        const enquiry = await Enquiry.findByPk(req.params.enquiryId);
        if(!enquiry) return res.status(404).json({success: false, message: "Enquiry not found"});
        await enquiry.destroy({where: {id: req.params.enquiryId}});
        return res.status(200).json({success: true, message: "Enquiry deleted successfully"});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
}

module.exports = {
    getAllEnquiries,
    getEnquiry,
    updateEnquiry,
    deleteEnquiry
}
