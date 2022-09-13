const mongoose = require("mongoose");

const quotesSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Quotes", quotesSchema);
