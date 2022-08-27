const mongoose = require("mongoose");

const commentsSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true, // 앞뒤 공백제거
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Posts",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comments", commentsSchema);
