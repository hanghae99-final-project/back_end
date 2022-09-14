const mongoose = require("mongoose");
const moment = require("moment-timezone");
const dateKorea = moment().tz("Asia/Seoul").format();

const bookmarkSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    forumId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Fourm",
    },
    insDate: { type: String, default: dateKorea },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bookmark", bookmarkSchema);
