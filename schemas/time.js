const mongoose = require("mongoose");

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
    restStartPoint: {
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
    isGoal: {
      type: Boolean,
      enum: [true, false],
      default: false,
    },
    tempSavedStudyTime: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Time", timeSchema);
