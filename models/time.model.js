const Time = require("../schemas/time");
const User = require("../schemas/user");
const { DateTime } = require("luxon");

// 오늘 공부 기록 정보를 불러오는 함수
exports.todayTime = async (user) => {
  // 오늘 공부 기록을 불러오기 위해서, 오늘의 시작과 오늘의 끝을 찾아야함.
  // 랭플의 시간은 정각이 아닌 오전 2시부터 시작됨을 상기(초기화와 db생성이 오전 2시 이후에 생성됨)
  // ex. 9월 12일 am 2:00 ~ 9월 13일 am 1:59 까지가 9월 12일 하루로 침
  let today = DateTime.now();

  // 오늘의 시작(todayStart)과 오늘의 끝(todayEnd) 설정
  // add(2, "hours")로 0시의 시작을 2시로 맞춰줌
  const todayStart = new Date(today.startOf("days"));
  const todayEnd = new Date(today.endOf("days"));

  // Time db에 오늘의 시작과 끝, user정보로 오늘자 user의 data를 가져옴
  const todayTime = await Time.findOne({
    $and: [
      {
        createdAt: {
          $gte: todayStart,
          $lte: todayEnd,
        },
      },
      {
        userId: user._id,
      },
    ],
  });
  return todayTime;
};

// 어제 공부 기록 정보를 불러오는 함수
exports.yesterdayTime = async (user) => {
  let today = DateTime.now();
  const yesterdayStart = new Date(today.minus({ days: 1 }).startOf("days"));
  const yesterdayEnd = new Date(today.minus({ days: 1 }).endOf("days"));
  const yesterdayTime = await Time.findOne({
    $and: [
      {
        createdAt: {
          $gte: yesterdayStart,
          $lte: yesterdayEnd,
        },
      },
      {
        userId: user._id,
      },
    ],
  });
  return yesterdayTime;
};

// 시간 data 생성 함수
exports.createTime = async (studyStartPoint, user) => {
  await Time.create({ studyStartPoint, userId: user._id });
};

// 시간 저장 함수
exports.saveTime = async (todayTime) => {
  await todayTime.save();
};

// 목표 시간 가져오기
exports.getTargetTime = async (user) => {
  // targetTime은 Time db에 있지 않고 User db에 있으므로 User db에서 검색
  const userData = await User.findOne({ _id: user._id });
  return userData;
};

exports.saveTargetTime = async (userData) => {
  await userData.save();
};

exports.insertNotifyToken = async (user, notificationToken) => {
  const result = await User.findOneAndUpdate(
    { _id: user._id },
    { $set: { notificationToken } },
    { new: true }
  );
  console.log(result);
};
