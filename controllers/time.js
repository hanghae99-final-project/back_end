const time = require("../models/time");
const asyncWrapper = require("../middleware/async");

exports.getTime = asyncWrapper(async (req, res) => {
  const user = req.locals;
  console.log(user);
  let yesterdayStudyTime = 0;
  let targetTime = user.targetTime; // user완료되면 넣자... 우선 1시간으로 고정해놨음
  let savedStudyTime = 0;
  let savedRestTime = 0;
  let studyStartPoint = 0;
  let restStartPoint = 0;

  const result = await time.getTime(user);
  if (result.todayTime) {
    savedStudyTime = result.todayTime.savedStudyTime;
    savedRestTime = result.todayTime.savedRestTime;
    studyStartPoint = result.todayTime.studyStartPoint;
    restStartPoint = result.todayTime.restStartPoint;
  }

  if (result.yestdayTime) {
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

exports.studyStart = asyncWrapper(async (req, res) => {
  const user = req.locals;
  const { studyStartPoint } = req.body;
  const result = await time.studyStart(studyStartPoint, user);
  res.status(200).json({ message: result });
});

exports.studyEnd = asyncWrapper(async (req, res) => {
  const user = req.locals;
  if (req.body.studyEndPoint) {
    const result = await time.studyEnd(req.body.studyEndPoint, 0, user);
    res.status(200).json({ message: result });
  } else if (req.body.restEndPoint) {
    const result = await time.studyEnd(0, req.body.restEndPoint, user);
    res.status(200).json({ message: result });
  }
});

exports.restStart = asyncWrapper(async (req, res) => {
  const user = req.locals;
  const { studyEndPoint, restStartPoint } = req.body;
  const result = await time.restStart(studyEndPoint, restStartPoint, user);
  res.status(200).json({ message: result });
});

exports.restEnd = asyncWrapper(async (req, res) => {
  const user = req.locals;
  const { restEndPoint, studyStartPoint } = req.body;
  const result = await time.restEnd(restEndPoint, studyStartPoint, user);
  res.status(200).json({ message: result });
});
