const Time = require("../schemas/time");
const User = require("../schemas/user");
const Studying = require("../schemas/studying");
const moment = require("moment");
const { suppressDeprecationWarnings } = require("moment");

exports.getTime = async (user) => {
  let today = moment();
  if (today.hours() < 2) {
    today = today.add(-1, "days");
  }
  const todayStart = moment(today).startOf("day").add(2, "hours");
  const todayEnd = moment(today).endOf("day").add(2, "hours");
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

  const yesterdayStart = moment(todayStart).subtract(1, "day");
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
  return { todayTime, yesterdayTime };
};

exports.studyStart = async (studyStartPoint, user) => {
  await Studying.create({ kakaoId: user.kakaoId, nickname: user.nickname });

  let today = moment();
  if (today.hours() < 2) {
    today = today.add(-1, "days");
  }
  const todayStart = moment(today).startOf("day").add(2, "hours");
  const todayEnd = moment(today).endOf("day").add(2, "hours");
  const existedTime = await Time.findOne({
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
  if (existedTime) {
    if (existedTime.studyStartPoint !== 0) {
      throw new Error("공부 시작 포인트가 이미 존재합니다.");
    }
    existedTime.studyStartPoint = studyStartPoint;
    await existedTime.save();
    return "study start success";
  } else {
    await Time.create({ studyStartPoint, userId: user._id });
    return "study start data create success";
  }
};

exports.studyEnd = async (studyEndPoint, restEndPoint, user) => {
  await Studying.deleteMany({ kakaoId: user.kakaoId });

  let today = moment();
  if (today.hours() < 2) {
    today = today.add(-1, "days");
  }
  const todayStart = moment(today).startOf("day").add(2, "hours");
  const todayEnd = moment(today).endOf("day").add(2, "hours");
  const existedTime = await Time.findOne({
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
  if (existedTime) {
    if (existedTime.studyStartPoint === 0 && existedTime.restStartPoint === 0) {
      throw new Error("시작 포인트가 0 에러입니다.");
    } else if (
      existedTime.studyStartPoint === 0 &&
      existedTime.restStartPoint !== 0
    ) {
      if (existedTime.restStartPoint >= restEndPoint) {
        throw new Error(
          "휴식 종료 포인트가 휴식 시작 포인트보다 시간상 앞서 있습니다."
        );
      }
      existedTime.savedRestTime += restEndPoint - existedTime.restStartPoint;
      existedTime.restStartPoint = 0;
      existedTime.restEndPoint = 0;
      await existedTime.save();
      return "Rest time has been accumulated.";
    } else if (
      existedTime.studyStartPoint !== 0 &&
      existedTime.restStartPoint === 0
    ) {
      if (existedTime.studyStartPoint >= studyEndPoint) {
        throw new Error(
          "공부 종료 포인트가 공부 시작 포인트보다 시간상 앞서 있습니다."
        );
      }
      existedTime.savedStudyTime += studyEndPoint - existedTime.studyStartPoint;
      existedTime.studyStartPoint = 0;
      existedTime.studyEndPoint = 0;

      if (existedTime.savedStudyTime > user.targetTime.time) {
        const userData = await User.findById({ _id: user._id });
        userData.targetTime.completed = true;
        await userData.save();
      }

      await existedTime.save();
      return "Study time has been accumulated.";
    }
  } else {
    throw new Error("데이터가 없습니다.");
  }
};

exports.restStart = async (studyEndPoint, restStartPoint, user) => {
  let today = moment();
  if (today.hours() < 2) {
    today = today.add(-1, "days");
  }
  const todayStart = moment(today).startOf("day").add(2, "hours");
  const todayEnd = moment(today).endOf("day").add(2, "hours");
  const existedTime = await Time.findOne({
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

  if (existedTime) {
    if (existedTime.studyStartPoint === 0) {
      throw new Error(
        "공부 시작 포인트가 없습니다. 휴식은 공부를 시작한 후에 가능합니다."
      );
    }
    if (existedTime.restStartPoint !== 0) {
      throw new Error("휴식 시작 포인트가 이미 존재합니다.");
    }
    existedTime.restStartPoint = restStartPoint;
    existedTime.savedStudyTime += studyEndPoint - existedTime.studyStartPoint;
    existedTime.studyStartPoint = 0;
    existedTime.studyEndPoint = 0;
    await existedTime.save();
    return "rest start success";
  } else {
    throw new Error("데이터가 없습니다.");
  }
};

exports.restEnd = async (restEndPoint, studyStartPoint, user) => {
  let today = moment();
  if (today.hours() < 2) {
    today = today.add(-1, "days");
  }
  const todayStart = moment(today).startOf("day").add(2, "hours");
  const todayEnd = moment(today).endOf("day").add(2, "hours");
  const existedTime = await Time.findOne({
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

  if (existedTime) {
    if (existedTime.restStartPoint === 0) {
      throw new Error("휴식 시작 포인트가 0 에러입니다.");
    }
    if (existedTime.restStartPoint >= restEndPoint) {
      throw new Error(
        "휴식 종료 포인트가 휴식 시작 포인트보다 시간상 앞서 있습니다."
      );
    }
    existedTime.studyStartPoint = studyStartPoint;
    existedTime.savedRestTime += restEndPoint - existedTime.restStartPoint;
    existedTime.restStartPoint = 0;
    existedTime.restEndPoint = 0;
    await existedTime.save();
    return "Rest time has been accumulated.";
  } else {
    throw new Error("데이터가 없습니다.");
  }
};

/**
 * 함수 명 : resetPoint
 * 매개변수 : user(object type)
 * 성공 시 return : 시간 초기화 완료
 * existedTime에 오늘 날짜와 유저의 고유 아이디(_id)로 오늘 공부 기록을 가져온다.
 * 공부 기록에 들어있는 모든 공부시간 기록과 누적 시간을 초기화 시킨다.
 */
exports.resetPoint = async (user) => {
  let today = moment();
  if (today.hours() < 2) {
    today = today.add(-1, "days");
  }
  const todayStart = moment(today).startOf("day").add(2, "hours");
  const todayEnd = moment(today).endOf("day").add(2, "hours");
  const existedTime = await Time.findOne({
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

  if (existedTime) {
    existedTime.studyStartPoint = 0;
    existedTime.studyEndPoint = 0;
    existedTime.restStartPoint = 0;
    existedTime.restEndPoint = 0;
    existedTime.savedStudyTime = 0;
    existedTime.savedRestTime = 0;
    await existedTime.save();
    return "시간 초기화 완료";
  } else {
    throw new Error("데이터가 없습니다.");
  }
};

/**
 * 함수 명 : resetpostTargetTimePoint
 * 매개변수 : targetTime(Number type), user(object type)
 * 성공 시 return : 목표시간 설정 완료
 * userData에 user의 고유 인덱스(_id)로 검색한다.
 * 데이터에서 targetTime을 수정해서 저장한다.
 */
 exports.postTargetTime = async (targetTime, user) => {
  const userData = await User.findOne({_id : user._id});

  if (userData) {
    userData.targetTime = targetTime;
    await userData.save();
    return "목표시간 설정 완료";
  } else {
    throw new Error("데이터가 없습니다.");
  }
};