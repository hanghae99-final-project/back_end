const mongoose = require("mongoose");

const quotesSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    from: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Quotes", quotesSchema);
