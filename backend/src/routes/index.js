const express = require('express');
const router = express.Router();

const authRoutes=require("./authRoutes");
router.use("/auth", authRoutes);

const publicRoutes=require("./publicRoutes");
router.use("/p", publicRoutes);

// const reviewRoutes=require("./reviewRoutes");
// router.use("/reviews", reviewRoutes);

module.exports = router;
