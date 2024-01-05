const mongoose=require('mongoose')

const supportMailSchema=new mongoose.Schema({
    email:{
        type:String,
        required:['true',"Email must be provided"]
    },
    subject:{
        type:String,
        required:['true',"Please provide the subject of your mail or concern of your mail"]
    },
    text:{
        type:String,
        required:['true',"Please provide the detailed description of your mail.!"]
    }
});


module.exports = mongoose.model.Supportmail || mongoose.model("Supportmail",supportMailSchema);