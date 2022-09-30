const timeModels = require("../models/time.model");
const studyingModels = require("../models/studying");
const { BadRequestError, ConflictError, NotFoundError } = require("../errors");

// 오늘, 어제 공부 기록 정보를 불러오는 함수
exports.getTime = async (user) => {
  let yesterdayStudyTime = 0;
  let targetTime = user.targetTime; // targetTime 수정
  let savedStudyTime = 0;
  let savedRestTime = 0;
  let studyStartPoint = 0;
  let restStartPoint = 0;

  const todayTime = await timeModels.todayTime(user); // 오늘 공부 기록을 가져옴
  const yesterdayTime = await timeModels.yesterdayTime(user); // 어제 공부 기록을 가져옴

  if (todayTime) {
    savedStudyTime = todayTime.savedStudyTime;
    savedRestTime = todayTime.savedRestTime;
    studyStartPoint = todayTime.studyStartPoint;
    restStartPoint = todayTime.restStartPoint;
  }

  if (yesterdayTime) {
    yesterdayStudyTime = yesterdayTime.savedStudyTime;
  }
  return {
    yesterdayStudyTime,
    targetTime,
    savedStudyTime,
    savedRestTime,
    studyStartPoint,
    restStartPoint,
  };
};

// 공부 시작 시각을 기록하는 함수
exports.studyStart = async (studyStartPoint, user) => {
  // 현재 공부 중인 사람을 체크하기 위해 Studying db에 user 정보를 넣음
  await studyingModels.startStudying(user);

  const todayTime = await timeModels.todayTime(user);
  // 오늘 공부한 기록이 있을 경우 studyStartPoint를 갱신
  if (todayTime) {
    if (todayTime.studyStartPoint !== 0) {
      throw new ConflictError("공부 시작 포인트가 이미 존재합니다.");
    }
    todayTime.studyStartPoint = studyStartPoint;
    await timeModels.saveTime(todayTime);
    return "study start point save success";

    // 오늘 공부한 기록이 없을 경우 오늘 공부 data 생성
  } else {
    await timeModels.createTime(studyStartPoint, user);
    return "study start data create success";
  }
};

// 공부 종료 시각을 받아와 Time db에 누적 시간 계산 후 저장하는 함수
exports.studyEnd = async (studyEndPoint, user) => {
  await studyingModels.endStudying(user);
  // 현재 공부 중인 사람을 체크하기 위해 Studying db에서 user 정보를 뺌
  const todayTime = await timeModels.todayTime(user);

  // studyEndPoint를 service에서 검수하는 이유 :
  // controller단의 studyEnd 함수에는 restEndPoint와 studyEndPoint 둘 중 하나를 받기에 service단에서 검수.
  if (todayTime) {
    if (studyEndPoint === 0 || typeof studyEndPoint !== "number") {
      throw new BadRequestError("공부 종료 시각이 0 or 숫자가 아닙니다.");
    } else if (todayTime.restStartPoint !== 0) {
      throw new ConflictError("휴식 시작 시각이 기록되어 있습니다.");
    } else if (todayTime.studyStartPoint === 0) {
      throw new NotFoundError("공부 시작 시각이 기록되어 있지 않습니다.");
    } else if (todayTime.studyStartPoint >= studyEndPoint) {
      throw new BadRequestError(
        "공부 종료 시각이 공부 시작 시각보다 시간상 앞서 있습니다."
      );
    } else {
      todayTime.savedStudyTime += studyEndPoint - todayTime.studyStartPoint;
      todayTime.studyStartPoint = 0;
      todayTime.studyEndPoint = 0;

      await timeModels.saveTime(todayTime);
      return "Study time has been accumulated.";
    }
  } else {
    throw new NotFoundError("데이터가 없습니다.");
  }
};

// 휴식 시작 시각을 기록하는 함수
exports.restStart = async (studyEndPoint, restStartPoint, user) => {
  const todayTime = await timeModels.todayTime(user);

  if (todayTime) {
    // 휴식 시작은 공부를 시작한 이후에 가능함
    if (todayTime.studyStartPoint === 0) {
      throw new NotFoundError(
        "공부 시작 포인트가 없습니다. 휴식은 공부를 시작한 후에 가능합니다."
      );
    } else if (todayTime.restStartPoint !== 0) {
      throw new ConflictError("휴식 시작 포인트가 이미 존재합니다.");
    } else if (todayTime.studyStartPoint >= studyEndPoint) {
      throw new BadRequestError(
        "공부 종료 시각이 공부 시작 시각보다 시간상 앞서 있습니다."
      );
    }
    // 휴식 시작 시 공부는 종료되고 공부 누적 시간이 저장됨. 공부 시각은 초기화
    todayTime.restStartPoint = restStartPoint;
    todayTime.savedStudyTime += studyEndPoint - todayTime.studyStartPoint;
    todayTime.studyStartPoint = 0;
    todayTime.studyEndPoint = 0;
    await timeModels.saveTime(todayTime);
    return "rest start success";
  } else {
    throw new NotFoundError("데이터가 없습니다.");
  }
};

// 휴식 종료 시각을 받아와 Time db에 누적 시간 계산 후 저장하는 함수
exports.restEnd = async (studyStartPoint, restEndPoint, user) => {
  const todayTime = await timeModels.todayTime(user);

  if (todayTime) {
    if (restEndPoint === 0 || typeof restEndPoint !== "number") {
      throw new BadRequestError("휴식 종료 시각이 0 or 숫자가 아닙니다.");
    } else if (todayTime.restStartPoint === 0) {
      throw new NotFoundError("휴식 시작 시각이 기록되어 있지 않습니다.");
    } else if (todayTime.studyStartPoint !== 0) {
      throw new ConflictError("공부 시작 시각이 기록되어 있습니다.");
    } else if (todayTime.restStartPoint >= restEndPoint) {
      throw new BadRequestError(
        "휴식 종료 시각이 휴식 시작 시각보다 시간상 앞서 있습니다."
      );
    } else {
      todayTime.savedRestTime += restEndPoint - todayTime.restStartPoint;
      todayTime.restStartPoint = 0;
      todayTime.restEndPoint = 0;
      // 공부 시작 시각이 있을 시 휴식을 종료하고 공부를 시작함
      if (studyStartPoint !== 0) {
        todayTime.studyStartPoint = studyStartPoint;
      }
      await timeModels.saveTime(todayTime);
      return "Rest time has been accumulated.";
    }
  } else {
    throw new NotFoundError("데이터가 없습니다.");
  }
};

// targetTime(목표시간) 입력 함수
exports.postTargetTime = async (targetTime, user) => {
  const userData = await timeModels.getTargetTime(user);
  if (userData) {
    // targetTime을 설정 후 저장
    userData.targetTime = targetTime;
    await timeModels.saveTargetTime(userData);
    return "목표시간 설정 완료";
  } else {
    throw new NotFoundError("데이터가 없습니다.");
  }
};

// 오늘자 공부 기록 리셋 함수
exports.resetPoint = async (user) => {
  const todayTime = await timeModels.todayTime(user);
  if (todayTime) {
    todayTime.studyStartPoint = 0;
    todayTime.studyEndPoint = 0;
    todayTime.restStartPoint = 0;
    todayTime.restEndPoint = 0;
    todayTime.savedStudyTime = 0;
    todayTime.savedRestTime = 0;
    await timeModels.saveTime(todayTime);
    return "시간 초기화 완료";
  } else {
    throw new NotFoundError("데이터가 없습니다.");
  }
};
