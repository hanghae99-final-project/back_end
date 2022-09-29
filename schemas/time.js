const mongoose = require("mongoose");
const moment = require("moment-timezone");
const dateKorea = moment().tz("Asia/Seoul").format();

const timeSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    studyStartPoint: {
      type: Number,
      default: 0,
    },
    studyEndPoint: {
      type: Number,
      required: true,
      default: 0,
    },
    restStartPoint: {
      type: Number,
      required: true,
      default: 0,
    },
    restEndPoint: {
      type: Number,
      required: true,
      default: 0,
    },
    savedStudyTime: {
      type: Number,
      required: true,
      default: 0,
    },
    savedRestTime: {
      type: Number,
      required: true,
      default: 0,
    },
    insDate: { type: String, default: dateKorea },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Time", timeSchema);
