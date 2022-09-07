const mongoose = require("mongoose");
const Users = require("./user");

const timeSchema = mongoose.Schema(
  {
    userId : {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Users",
      required: true
    },
    studyStartPoint: {
      type: Number,
      required: true,
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Time", timeSchema);
