const Time = require("../schemas/time");
const User = require("../schemas/user");
const Studying = require("../schemas/studying");
const moment = require("moment");

// 오늘 공부 기록 정보를 불러오는 함수
exports.todayTime = async (user) => {
  // 오늘 공부 기록을 불러오기 위해서, 오늘의 시작과 오늘의 끝을 찾아야함.
  // 랭플의 시간은 정각이 아닌 오전 2시부터 시작됨을 상기(초기화와 db생성이 오전 2시 이후에 생성됨)
  // ex. 9월 12일 am 2:00 ~ 9월 13일 am 1:59 까지가 9월 12일 하루로 침
  let today = moment();

  // 9월 12일자 db를 검색할 경우, 9월 13일 0시~2시에 검색할 경우 내일 자 db를 검색하는 오류가 발생
  // 0~2시 사이에 검색할 경우 하루를 빼줌. 13일 -> 12일
  if (today.hours() < 2) {
    today = today.add(-1, "days");
  }

  // 오늘의 시작(todayStart)과 오늘의 끝(todayEnd) 설정
  // add(2, "hours")로 0시의 시작을 2시로 맞춰줌
  const todayStart = moment(today).startOf("day").add(2, "hours");
  const todayEnd = moment(today).endOf("day").add(2, "hours");

  // Time db에 오늘의 시작과 끝, user정보로 오늘자 user의 data를 가져옴
  const todayTime = await Time.findOne({
    $and: [
      {
        createdAt: {
          $gte: todayStart.toDate(),
          $lte: todayEnd.toDate(),
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
  let today = moment();
  if (today.hours() < 2) {
    today = today.add(-1, "days");
  }
  const yesterdayStart = moment(today).subtract(1, "day");
  const yesterdayEnd = moment(yesterdayStart).endOf("day").add(2, "hours");
  const yesterdayTime = await Time.findOne({
    $and: [
      {
        createdAt: {
          $gte: yesterdayStart.toDate(),
          $lte: yesterdayEnd.toDate(),
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
  // 현재 공부 중인 사람을 체크하기 위해 Studying db에 user 정보를 넣음
  // await Studying.create({ kakaoId: user.kakaoId, nickname: user.nickname });
  await Time.create({ studyStartPoint, userId: user._id });
};

// 시간 저장 함수
exports.saveTime = async (todayTime, user) => {
  // 현재 공부 중인 사람을 체크하기 위해 Studying db에 user 정보를 넣음
  // await Studying.create({ kakaoId: user.kakaoId, nickname: user.nickname });
  await todayTime.save().then(() => {});
};

// 목표 시간 설정 함수
exports.postTargetTime = async (targetTime, user) => {
  // targetTime은 Time db에 있지 않고 User db에 있으므로 User db에서 검색
  const userData = await User.findOne({ _id: user._id });

  if (userData) {
    // targetTime을 설정 후 저장
    userData.targetTime = targetTime;
    await userData.save();
    return "목표시간 설정 완료";
  } else {
    throw new Error("데이터가 없습니다.");
  }
};
