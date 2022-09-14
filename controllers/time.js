const { StatusCodes } = require("http-status-codes");
const time = require("../models/time");
const asyncWrapper = require("../middleware/async");
const e = require("express");

// 오늘 공부 기록 정보를 불러오는 함수
exports.getTime = asyncWrapper(async (req, res) => {
  const user = req.locals;
  console.log(user);
  let yesterdayStudyTime = 0;
  let targetTime = user.targetTime; // targetTime 수정
  let savedStudyTime = 0;
  let savedRestTime = 0;
  let studyStartPoint = 0;
  let restStartPoint = 0;

  // models/time의 getTime함수
  // 어제와 오늘자 공부 기록에 대한 정보를 가져온다.
  // result 값은 {todayTime과 yesterdayTime}
  const result = await time.getTime(user);

  // todayTime(오늘자 공부 기록) 이 있을 경우 지정된 변수에 할당
  if (result.todayTime) {
    savedStudyTime = result.todayTime.savedStudyTime;
    savedRestTime = result.todayTime.savedRestTime;
    studyStartPoint = result.todayTime.studyStartPoint;
    restStartPoint = result.todayTime.restStartPoint;
  }

  // yesterdayTime(어제자 공부 기록) 이 있을 경우 yesterdayStudyTime 변수에 할당
  if (result.yesterdayTime) {
    yesterdayStudyTime = result.yesterdayTime.savedStudyTime;
  }

  res.status(200).json({
    yesterdayStudyTime,
    targetTime,
    savedStudyTime,
    savedRestTime,
    studyStartPoint,
    restStartPoint,
  });
});

// (공부 시작 버튼) 공부 시작 시각을 Time db에 기록 함수
exports.studyStart = asyncWrapper(async (req, res) => {
  const user = req.locals;
  const { studyStartPoint } = req.body;
  if (!studyStartPoint) {
    throw new Error("오류입니다");
  }

  // models/time의 studyStart 함수의 결과값을 res로 반환해줌
  const result = await time.studyStart(studyStartPoint, user);
  res.status(200).json({ message: result });
});

// (그만하기 버튼) 공부 or 휴식 종료 시각을 받아와 Time db에 누적 시간 계산 후 저장하는 함수
// 그만하기 버튼은 휴식 중일 때, 공부 중일 때 경우가 두가지가 있음
// 휴식 중일 때 : 휴식 종료 시각 - 휴식 시작 시각 = 휴식 누적 시간(db에 저장) , 그 후 휴식 시작, 종료 시각 초기화
// 공부 중일 때 : 공부 종료 시각 - 공부 시작 시각 = 공부 누적 시간(db에 저장) , 그 후 공부 시작, 공부 시각 초기화
exports.studyEnd = asyncWrapper(async (req, res) => {
  const user = req.locals;
  let result;

  if (req.body.studyEndPoint && req.body.restEndPoint) {
    throw new Error("오류입니다.");
  }

  // user가 공부 중일 때는 studyEndPoint를 req.body로 받는다.
  if (req.body.studyEndPoint) {
    result = await time.studyEnd(req.body.studyEndPoint, 0, user);
    // user가 휴식 중일 때는 restEndPoint를 req.body로 받는다.
  } else if (req.body.restEndPoint) {
    result = await time.studyEnd(0, req.body.restEndPoint, user);
  } else {
    throw new Error("오류입니다.");
  }

  res.status(200).json({ message: result });
});

// (휴식 하기 버튼) 휴식 시작 시간을 Time db에 기록 함수
exports.restStart = asyncWrapper(async (req, res) => {
  const user = req.locals;

  // 휴식을 클릭할 수 있는 건 공부 중일 때만 가능함
  // 휴식 시작과 동시에 공부 시간은 멈춰야 하므로,
  // studyEndPoint(공부종료시각), restStartPoint(휴식시작시각)을 받아야함
  const { studyEndPoint, restStartPoint } = req.body;
  const result = await time.restStart(studyEndPoint, restStartPoint, user);
  res.status(200).json({ message: result });
});

// (휴식 종료 버튼) 휴식 종료 시간을 받아와 time db에 저장하는 함수
exports.restEnd = asyncWrapper(async (req, res) => {
  const user = req.locals;

  // 휴식 종료와 동시에 공부가 시작되므로,
  // restEndPont(휴식종료시각), studyStartPoint(공부시작시각)을 받아야함
  const { restEndPoint, studyStartPoint } = req.body;
  const result = await time.restEnd(restEndPoint, studyStartPoint, user);
  res.status(200).json({ message: result });
});

// 오늘 자 공부 기록 시간 초기화 함수
exports.resetPoint = asyncWrapper(async (req, res) => {
  const user = req.locals;
  const result = await time.resetPoint(user);
  res.status(200).json({ message: result });
});

// targetTime(목표시간) 입력 함수
exports.postTargetTime = asyncWrapper(async (req, res) => {
  const user = req.locals;
  // user가 설정한 targetTime을 req.body로 받는다.
  const { targetTime } = req.body;
  const result = await time.postTargetTime(targetTime, user);
  res.status(200).json({ message: result });
});
