const express = require('express');
const router = express.Router();

const authRoutes=require("./admin/authRoutes");
router.use("/auth", authRoutes);

const userRoutes=require("./admin/userRoutes");
router.use("/users", userRoutes);

const productRoutes=require("./admin/productRoutes");
router.use("/products", productRoutes);

const enquiryRoutes=require("./admin/enquiryRoutes");
router.use("/enquiries", enquiryRoutes);

const reviewRoutes=require("./admin/reviewRoutes");
router.use("/reviews", reviewRoutes);

const storeRoutes=require("./admin/storeRoutes");
router.use("/stores", storeRoutes);

const staffRoutes=require("./admin/staffRoutes");
router.use("/staff", staffRoutes);

const productMediaRoutes=require("./admin/productMediaRoutes");
router.use("/productMedia", productMediaRoutes);

const profileMediaRoutes=require("./admin/profileMediaRoutes");
router.use("/profileMedia", profileMediaRoutes);

const supportRoutes=require("./admin/supportRoutes");
router.use("/support", supportRoutes);

const categoryRoutes=require("./admin/categoryRoutes");
router.use("/category", categoryRoutes);


module.exports = router;
