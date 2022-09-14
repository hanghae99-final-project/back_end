const mongoose = require("mongoose");
const moment = require("moment-timezone");
const dateKorea = moment().tz("Asia/Seoul").format();

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
    insDate: { type: String, default: dateKorea },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AuthNumber", authNumber);
