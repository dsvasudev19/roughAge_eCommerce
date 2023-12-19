const mongoose = require('mongoose')
//roughAge001
//roughageAdmin1729
//DSvasudev@1729


const adminSchema= new mongoose.Schema({
    FullName:{
        type:String,
        required:true
    },
    employeId:{
        type:String,
        required:true,
        unique:true,
        min:8
    },
    adminId:{
        type:String,
        required:true,
        unique:true,
        min:8
    },
    email:{
        type:String,
        required:true,
        unique:[true,"Already an account exists with the provided email"]
    },
    password:{
        type:String,
        required:true,
        unique:[true,"Dont provide the existing password"],
        min:10
    },
    designation:String,
    company:String,
    phone:Number,
    accessToInventory:Boolean
})


module.exports=mongoose.model.Admin || mongoose.model('Admin',adminSchema);