const mongoose = require("mongoose");
const moment = require("moment-timezone");
const dateKorea = moment().tz("Asia/Seoul").format();

const commentSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    fourmId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Fourm",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    insDate: { type: String, default: dateKorea },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
