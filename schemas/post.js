const mongoose = require("mongoose");

const postsSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true, // 앞뒤 공백제거
    },
    postImg: {
      type: Array,
      required: false,
    },
    content: {
      type: String,
      required: true,
      trim: true, // 앞뒤 공백제거
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    comment: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Posts", postsSchema);
