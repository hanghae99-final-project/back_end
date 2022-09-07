const time = require("../models/time");

exports.getTime = async (req, res) => {
  try {
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

    res
      .status(200)
      .json({
        yesterdayStudyTime,
        targetTime,
        savedStudyTime,
        savedRestTime,
        studyStartPoint,
        restStartPoint,
      });
  } catch (err) {
    res.status(400).json({ errMessage: err.message });
  }
};

exports.studyStart = async (req, res) => {
  try {
    const user = req.locals;
    const { studyStartPoint } = req.body;
    const result = await time.studyStart(studyStartPoint, user);
    res.status(200).json({ message: result });
  } catch (err) {
    res.status(400).json({ errMessage: err.message });
  }
};

exports.studyEnd = async (req, res) => {
  try {
    const user = req.locals;
    if (req.body.studyEndPoint) {
        const result = await time.studyEnd(req.body.studyEndPoint, 0, user);
        res.status(200).json({ message: result });
    } else if (req.body.restEndPoint) {
        const result = await time.studyEnd(0, req.body.restEndPoint, user);
        res.status(200).json({ message: result });
    }
    
  } catch (err) {
    res.status(400).json({ errMessage: err.message });
  }
};

exports.restStart = async (req, res) => {
  try {
    const user = req.locals;
    const { studyEndPoint, restStartPoint } = req.body;
    const result = await time.restStart(studyEndPoint, restStartPoint, user);
    res.status(200).json({ message: result });
  } catch (err) {
    res.status(400).json({ errMessage: err.message });
  }
};

exports.restEnd = async (req, res) => {
  try {
    const user = req.locals;
    const { restEndPoint, studyStartPoint } = req.body;
    const result = await time.restEnd(restEndPoint, studyStartPoint, user);
    res.status(200).json({ message: result });
    
  } catch (err) {
    res.status(400).json({ errMessage: err.message });
  }
};
