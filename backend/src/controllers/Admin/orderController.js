const {Order,OrderItem,Address,Product,User}=require("../../models")


const getAll=async(req,res,next)=>{
    try {
        const orders=await Order.findAll({
            include:[
                {
                    model:OrderItem,
                    include:{
                        model:Product
                    }
                },{
                    model:Address
                },
                {
                    model:User
                }
            ]
        })
        console.log(orders);
        if(orders.length>0){
            return res.status(200).json({success:true,message:"Orders Fetched Successfully",data:orders})
        }
        return res.status(404).json({success:false,message:"No orders"})
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports={
    getAll
}