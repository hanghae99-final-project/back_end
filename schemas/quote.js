const moment = require("moment-timezone");
const dateKorea = moment().tz("Asia/Seoul").format();
const mongoose = require("mongoose");

const quotesSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    insDate: { type: String, default: dateKorea },
  },
  { timestamps: false }
);
module.exports = mongoose.model("Quotes", quotesSchema);
