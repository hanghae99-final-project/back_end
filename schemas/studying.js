const mongoose = require("mongoose");
const moment = require("moment-timezone");
const dateKorea = moment().tz("Asia/Seoul").format();

const studyingSchema = mongoose.Schema({
  kakaoId: Number,
  nickname: String,
  insDate: { type: String, default: dateKorea },
});

module.exports = mongoose.model("Studying", studyingSchema);
