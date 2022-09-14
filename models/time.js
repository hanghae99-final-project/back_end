const Time = require("../schemas/time");
const User = require("../schemas/user");
const Studying = require("../schemas/studying");
const moment = require("moment");

// 오늘 공부 기록 정보를 불러오는 함수
exports.getTime = async (user) => {
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

  // 어제자 공부기록도 필요하므로 어제의 시작과 끝을 설정
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

// 공부 시작 시각을 Time db에 기록하는 함수
exports.studyStart = async (studyStartPoint, user) => {
  // 현재 공부 중인 사람을 체크하기 위해 Studying db에 user 정보를 넣음
  await Studying.create({ kakaoId: user.kakaoId, nickname: user.nickname });

  // 위의 로직과 동일
  let today = moment();
  if (today.hours() < 2) {
    today = today.add(-1, "days");
  }
  const todayStart = moment(today).startOf("day").add(2, "hours");
  const todayEnd = moment(today).endOf("day").add(2, "hours");

  // existedTime 변수에 오늘자 공부 기록을 불러옴
  // 오늘 공부를 처음 시작하는 경우 existedTime이 없을 수 있음
  // 이 경우 오늘자 data를 생성해줌
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

  // 오늘 공부 data가 있을 경우 공부 시작 시각(studyStartPoint)을 수정해줌
  if (existedTime) {
    if (existedTime.studyStartPoint !== 0) {
      throw new Error("공부 시작 포인트가 이미 존재합니다.");
    }
    existedTime.studyStartPoint = studyStartPoint;
    await existedTime.save();
    return "study start success";

    // 오늘 공부 data가 없을 경우 새롭게 data를 생성해줌
  } else {
    await Time.create({ studyStartPoint, userId: user._id });
    return "study start data create success";
  }
};

// 공부, 휴식 종료 시각을 받아와 Time db에 누적 시간 계산 후 저장하는 함수
exports.studyEnd = async (studyEndPoint, restEndPoint, user) => {
  // 현재 공부 중인 사람을 체크하기 위해 Studying db에 user 정보를 제거
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
    // 공부 시작 시각 or 휴식 시작 시각이 반드시 있어야 누적 시간 기록이 가능함
    // 그 외 오류 처리
    if (existedTime.studyStartPoint === 0 && existedTime.restStartPoint === 0) {
      throw new Error("시작 포인트가 0 에러입니다.");

      // 휴식 종료 시 if문 (이 때 restStartPoint가 0이 아니여야 함)
    } else if (restEndPoint !== 0) {
      if (existedTime.restStartPoint === 0) {
        throw new Error("휴식 시작 시각이 기록되어 있지 않습니다.");
      }
      // 종료 시각이 시작 시각보다 앞선 경우 에러 발생
      if (existedTime.restStartPoint >= restEndPoint) {
        throw new Error(
          "휴식 종료 포인트가 휴식 시작 포인트보다 시간상 앞서 있습니다."
        );
      }
      // 휴식 누적 시간(savedRestTime) = 휴식 종료 시각 - 휴식 시작 시각
      // 휴식 종료 시각과 휴식 시작 시각을 초기화 후 저장한다.
      existedTime.savedRestTime += restEndPoint - existedTime.restStartPoint;
      existedTime.restStartPoint = 0;
      existedTime.restEndPoint = 0;
      await existedTime.save();
      return "Rest time has been accumulated.";

      // 공부 종료 시 if문 (이 때 studyStartPoint가 0이 아니여야 함)
    } else if (studyEndPoint !== 0) {
      if (existedTime.studyStartPoint === 0) {
        throw new Error("공부 시작 시각이 기록되어 있지 않습니다.");
      }
      // 종료 시각이 시작 시각보다 앞선 경우 에러 발생
      if (existedTime.studyStartPoint >= studyEndPoint) {
        throw new Error(
          "공부 종료 포인트가 공부 시작 포인트보다 시간상 앞서 있습니다."
        );
      }

      // 공부 누적 시간(savedStudyTime) = 공부 종료 시각 - 공부 시작 시각
      // 공부 종료 시각과 공부 시작 시각을 초기화 후 저장한다.
      existedTime.savedStudyTime += studyEndPoint - existedTime.studyStartPoint;
      existedTime.studyStartPoint = 0;
      existedTime.studyEndPoint = 0;
      await existedTime.save();
      return "Study time has been accumulated.";
    }

    // 공부 종료 시각으로 공부 누적 시간을 기록해야하므로 time db에 data가 존재해야 함
    // 아닐 경우 에러 처리
  } else {
    throw new Error("데이터가 없습니다.");
  }
};

// 휴식 시작 시간을 Time db에 기록 함수
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
    // 휴식 시작은 공부를 시작한 이후에 가능함
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

// 휴식 종료 시간을 받아와 time db에 저장하는 함수
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

    // 휴식을 종료를 하자마자 공부가 다시 시작됨
    // 따라서 휴식 시작 시각(studyStartPoint)을 0에서 받아온 시각으로 바꿔줌
    // 휴식 누적 시간(savedRestTime) = 휴식 종료 시각(restEndPoint) - 휴식 시작 시각(restStartPoint)
    // (studyStartPoint=0 : 휴식 시작했을 시 공부 시간 누적하고 공부 시작 시각을 초기화해줬으므로...)
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

// 오늘 자 공부 data 초기화 함수
exports.resetPoint = async (user) => {
  let today = moment();
  if (today.hours() < 2) {
    today = today.add(-1, "days");
  }
  const todayStart = moment(today).startOf("day").add(2, "hours");
  const todayEnd = moment(today).endOf("day").add(2, "hours");
  // 오늘의 시작과 끝, user정보를 가지고 오늘 data를 가지고 옴
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

  // 가지고 온 데이터 초기화
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

// targetTime(공부 목표 시간) 설정 함수
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
