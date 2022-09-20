const { StatusCodes } = require("http-status-codes");
const time = require("../service/time");

// 오늘 공부 기록 정보를 불러오는 함수
exports.getTime = async (req, res) => {
  const user = req.locals;
  const result = await time.getTime(user);

  res.status(200).json(result);
};

// (공부 시작 버튼) 공부 시작 시각을 Time db에 기록 함수
exports.studyStart = async (req, res) => {
  const user = req.locals;
  const { studyStartPoint } = req.body;
  if (!studyStartPoint) {
    throw new Error("공부 시작 시각을 받아오지 않습니다.");
  }

  const result = await time.studyStart(studyStartPoint, user);
  res.status(200).json({ message: result });
};

// (그만하기 버튼) 공부 or 휴식 종료 시각을 받아와 Time db에 누적 시간 계산 후 저장하는 함수
exports.studyEnd = async (req, res) => {
  const user = req.locals;
  let result;

  if (req.body.studyEndPoint && req.body.restEndPoint) {
    throw new Error("공부 시작 시각과 휴식 시작 시각은 같이 올 수 없습니다.");
  }

  // user가 공부 중일 때는 studyEndPoint를 req.body로 받는다.
  if (req.body.studyEndPoint) {
    result = await time.studyEnd(req.body.studyEndPoint, user);
    // user가 휴식 중일 때는 restEndPoint를 req.body로 받는다.
  } else if (req.body.restEndPoint) {
    result = await time.restEnd(0, req.body.restEndPoint, user);
  } else {
    throw new Error("공부 시작 시각 또는 휴식 시작 시각이 없습니다.");
  }

  res.status(200).json({ message: result });
};

// (휴식 하기 버튼) 휴식 시작 시간을 Time db에 기록 함수
exports.restStart = async (req, res) => {
  const user = req.locals;
  const { studyEndPoint, restStartPoint } = req.body;
  if (!studyEndPoint || !restStartPoint) {
    throw new Error("공부 종료 시각이나 휴식 시작 시각이 없습니다.");
  }
  const result = await time.restStart(studyEndPoint, restStartPoint, user);
  res.status(200).json({ message: result });
};

// (휴식 종료 버튼) 휴식 종료 시간을 받아와 time db에 저장하는 함수
exports.restEnd = async (req, res) => {
  const user = req.locals;
  const { restEndPoint, studyStartPoint } = req.body;
  if (!restEndPoint || !studyStartPoint) {
    throw new Error("휴식 종료 시각이나 공부 시작 시각이 없습니다.");
  }
  const result = await time.restEnd(studyStartPoint, restEndPoint, user);
  res.status(200).json({ message: result });
};

// targetTime(목표시간) 입력 함수
exports.postTargetTime = async (req, res) => {
  const user = req.locals;
  // user가 설정한 targetTime을 req.body로 받는다.
  const { targetTime } = req.body;
  if (!targetTime) {
    throw new Error("목표 시간이 없습니다.");
  }
  const result = await time.postTargetTime(targetTime, user);
  res.status(200).json({ message: result });
};

// 오늘 자 공부 기록 시간 초기화 함수
exports.resetPoint = async (req, res) => {
  const user = req.locals;
  const result = await time.resetPoint(user);
  res.status(200).json({ message: result });
};
