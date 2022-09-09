const mongoose = require("mongoose");

const studyingSchema = mongoose.Schema(
  {
    kakaoId : Number,
    nickname : String
  },
);

module.exports = mongoose.model("Studying", studyingSchema);
