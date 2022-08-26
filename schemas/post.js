const mongoose = require("mongoose");

const postsSchema = mongoose.Schema({
    title : {
        type :String,
        required : true,
        trim : true // 앞뒤 공백제거
    },
    postImg: {
        type :Array,
        required : false
    },
    content : {
        type : String,
        required : true,
        trim : true // 앞뒤 공백제거
    },
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "Users",
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