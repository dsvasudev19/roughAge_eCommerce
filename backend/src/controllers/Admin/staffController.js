const {Staff} = require('../../models');

const getStaffs = async (req, res) => {
    try {
        const staffs = await Staff.findAll();
        if (staffs.length > 0) {
            return res.status(200).json({success: true, data: staffs, message: "Successfully fetched all staffs"});
        }
        return res.status(404).json({message: "No staffs found", success: false});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const getStaff = async (req, res) => {
    try {
        const staff = await Staff.findByPk(req.params.staffId);
        if (staff) {
            return res.status(200).json({success: true, data: staff, message: "Successfully fetched staff"});
        } else {
            return res.status(404).json({message: "Staff not found", success: false});
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const createStaff = async (req, res) => {
    try {
        const exists = await Staff.findOne({where: {email: req.body.email}});
        if (exists) {
            return res.status(400).json({success: false, data: exists, message: "Staff already exists"});
        }
        const staff = await Staff.create(req.body);
        if (staff){
            return res.status(201).json({success: true, data: staff, message: "Staff created successfully"});
        }
        return res.status(400).json({success: false, message: "Staff creation failed"});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const updateStaff = async (req, res) => {
    try {
        const staff = await Staff.findByPk(req.params.staffId);
        if (staff) {
            await Staff.update(req.body,{where:{
                id:req.params.staffId
            }});
            return res.status(200).json({success: true, old_data: staff, message: "Staff updated successfully",updated_data:req.body});
        } else {
            return res.status(404).json({success: false, message: "Staff not found"});
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const deleteStaff = async (req, res) => {
    try {
        const staff = await Staff.findByPk(req.params.staffId);
        if (staff) {
            await staff.destroy();
            return res.status(200).json({success: true, message: "Staff removed"});
        } else {
            return res.status(404).json({success: false, message: "Staff not found"});
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

module.exports = {
    getStaffs,
    getStaff,
    createStaff,
    updateStaff,
    deleteStaff
};