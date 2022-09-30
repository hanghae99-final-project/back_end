const mongoose = require("mongoose");
const moment = require("moment-timezone");
const dateKorea = moment().tz("Asia/Seoul").format();

const specListSchema = mongoose.Schema({
  education: { type: String, enum: ["학력", "경력"] },
  career: { type: String },
  year: { type: String, maxlength: 4 },
  experience: { type: String, maxlength: 100 },
});

const dDaySchema = mongoose.Schema({
  deadline: String,
  content: String,
});

const usersSchema = mongoose.Schema(
  {
    kakaoId: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },
    nickname: {
      type: String,
      minlength: 2,
      maxlength: 10,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    ageGroup: {
      type: String,
      enum: ["20대", "30대", "기타"],
    },
    specialty: {
      type: String,
      enum: [
        "경영사무",
        "마케팅·광고·홍보",
        "무역·유통",
        "디자인",
        "영업·고객상담",
        "IT개발·인터넷",
        "전문·특수·연구직",
        "미디어·문화",
        "교육",
        "서비스",
        "연구개발·설계",
        "관광레저서비스",
        "건설·건축",
        "의료",
        "공무원",
      ],
    },
    /* 이전 : targetTime(목표시간)은 time, completed로 구성되었음
     * 현재 : targetTime(목표시간)은 시간에 대한 ms 숫자로 구성
     **/
    targetTime: {
      type: Number,
      default: 0,
    },

    spec: [specListSchema],
    dDay: [dDaySchema],
    insDate: { type: String, default: dateKorea },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", usersSchema);
