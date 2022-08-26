const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
    email : {
        type :String,
        required : true,
        trim : true // 앞뒤 공백제거
    },
    password: {
        type :String,
        required : true
    },
    provider : {
        type : String,
        required : true,
        trim : true // 앞뒤 공백제거
    },
    nickname : {
        type : String,
        required : true,
        trim : true // 앞뒤 공백제거
    },
    createdAt : {
        type : Date,
        default : Date.now,
        required : true,
        unique : false
    }
});

module.exports=mongoose.model("Users",usersSchema);