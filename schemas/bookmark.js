const mongoose = require("mongoose");

const bookmarkSchema = mongoose.Schema(
    {
      userId : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Users"
      },
      forumId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Fourm"
      }
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model("Bookmark", bookmarkSchema);