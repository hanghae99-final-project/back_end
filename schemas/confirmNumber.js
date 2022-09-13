const mongoose = require("mongoose");

const authNumber = mongoose.Schema(
  {
    authNumber: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AuthNumber", authNumber);
