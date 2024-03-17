const router=require("express").Router();
const orderController=require("../../controllers/Admin/orderController")


router.get("/",orderController.getAll)

module.exports=router;