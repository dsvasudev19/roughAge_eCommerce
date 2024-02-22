const {SupportEnquiries} = require('../../models');

const getAllSupportEnquiries = async (req, res, next) => {
    try {
        const enquiries = await SupportEnquiries.findAll();
        if (enquiries) {
            return res.status(200).json({success: true, data: enquiries, message: 'Enquiries retrieved successfully'});
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const getSupportEnquiryById = async (req, res, next) => {
    try {
        const {id} = req.params;
        const enquiry = await SupportEnquiries.findOne({
            where: {id: id}
        });
        if (enquiry) {
            return res.status(200).json({success: true, data: enquiry, message: 'Enquiry retrieved successfully'});
        } else {
            return res.status(404).json({success: false, message: 'Enquiry not found'});
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}



const updateSupportEnquiry = async (req, res, next) => {
    try {
        const {id} = req.params;
        const enquiry = await SupportEnquiries.findOne({
            where: {id: id}
        });
        if (enquiry) {

            await enquiry.update(req.body);
            if (req.body.status == 1) {
                await enquiry.destroy();
            }
            return res.json({success: true, data: enquiry, message: 'Enquiry updated successfully'});
        } else {
            return res.status(404).json({success: false, message: 'Enquiry not found'});
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const deleteSupportEnquiry = async (req, res, next) => {
    try {
        const {id} = req.params;
        const enquiry = await SupportEnquiries.findOne({
            where: {id: id}
        });
        if (enquiry) {
            await enquiry.destroy();
            return res.status(200).json({success: true, message: 'Enquiry deleted successfully'});
        } else {
            return res.status(404).json({success: false, message: 'Enquiry not found'});
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}
const getTodayEnquiries = async (req, res, next) => {
    try {
        const enquiries = await SupportEnquiries.findAll();
        const todayEnquiries = enquiries.filter(enquiry => enquiry.createdAt.toDateString() === new Date().toDateString());
        if (enquiries) {
            return res.status(200).json({success: true, data: todayEnquiries, message: 'Enquiries retrieved successfully'});
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}


module.exports = {
    getAllSupportEnquiries,
    getSupportEnquiryById,
    updateSupportEnquiry,
    deleteSupportEnquiry,
    getTodayEnquiries
}