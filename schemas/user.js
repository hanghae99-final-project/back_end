const mongoose = require("mongoose");

const specListSchema = mongoose.Schema({
  year: { type: String, maxlength: 4 },
  experience: { type: String, maxlength: 100 },
});

const dDaySchema = mongoose.Schema({
  deadline: Number,
  content: String,
});

const targetTimeSchema = mongoose.Schema({
  time: Number,
  completed: Boolean,
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
      minlength: 1,
      maxlength: 20,
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
      default: "기타",
    },
    specialty: {
      type: String,
      enum: [
        "경영사무",
        "마케팅광고홍보",
        "무역유통",
        "디잔인",
        "영업고객상담",
        "IT개발인터넷",
        "전문특수연구직",
        "미디어문화",
        "교육",
        "서비스",
        "연구개발설계",
        "관광레저서비스",
        "건설건축",
        "의료",
      ],
    },
    targetTime: {
      time: { type: Number, default: 0 },
      completed: { type: Boolean, default: false },
    },

    spec: [specListSchema],
    dDay: [dDaySchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", usersSchema);
