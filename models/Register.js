const mongoose = require("mongoose")

const UserModel = new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    surname:{
        type:String,
        require:true
    },     
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String
    },
    confpassword:{
        type:String
    }

})
module.exports = mongoose.model("User", UserModel)