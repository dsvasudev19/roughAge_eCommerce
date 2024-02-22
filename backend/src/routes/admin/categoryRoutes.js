const express=require('express');
const router=express.Router();
const categoryController=require('../../controllers/Admin/categoryController');
const {categoryMediaUpload}=require('../../utils/multer');

router.get("/",categoryController.getAllCategories)

router.get("/:id",categoryController.getCategoryById);

router.post("/",categoryMediaUpload.single("categoryImage"),categoryController.createCategory);

router.put("/:id",categoryMediaUpload.single("categoryImage"),categoryController.updateCategory);

router.delete("/:id",categoryController.deleteCategory);

module.exports=router;
