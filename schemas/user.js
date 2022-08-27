const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true, // 앞뒤 공백제거
    match: /.+\@.+@..+/,
  },
  password: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    required: true,
    trim: true, // 앞뒤 공백제거
    // enum : ["1","2","3"]
  },
  nickname: {
    type: String,
    required: true,
    trim: true, // 앞뒤 공백제거
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Posts",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = mongoose.model("Users", usersSchema);
