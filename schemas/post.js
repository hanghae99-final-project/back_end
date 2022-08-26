const mongoose = require("mongoose");

const postsSchema = mongoose.Schema({
    title : {
        type :String,
        required : true,
        trim : true // 앞뒤 공백제거
    },
    postImg: {
        type :String,
        required : true
    },
    title : {
        type : String,
        required : true,
        trim : true // 앞뒤 공백제거
    },
    content : {
        type : String,
        required : true,
        trim : true // 앞뒤 공백제거
    },
    createdAt : {
        type : Date,
        default : Date.now,
        required : true,
        unique : true
    }
});

module.exports=mongoose.model("Posts",postsSchema);