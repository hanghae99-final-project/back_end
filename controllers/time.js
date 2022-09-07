const time = require("../models/time");

exports.getTime = async (req, res) => {
  try {
    let yesterdayStudyTime = 0;
    let targetTime = {time:3600000, completed : false}; // user완료되면 넣자... 우선 1시간으로 고정해놨음
    let savedStudyTime = 0;
    let savedRestTime = 0;
    let studyStartPoint = 0;
    let restStartPoint = 0;

    const result = await time.getTime();
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
    const { studyStartPoint } = req.body;
    const result = await time.studyStart(studyStartPoint);
    res.status(200).json({ message: result });
  } catch (err) {
    res.status(400).json({ errMessage: err.message });
  }
};

exports.studyEnd = async (req, res) => {
  try {
    if (req.body.studyEndPoint) {
        const result = await time.studyEnd(req.body.studyEndPoint);
        res.status(200).json({ message: result });
    } else if (req.body.restEndPoint) {
        const result = await time.restEnd(req.body.restEndPoint);
        res.status(200).json({ message: result });
    }
    
  } catch (err) {
    res.status(400).json({ errMessage: err.message });
  }
};

exports.restStart = async (req, res) => {
  try {
    const { studyEndPoint, restStartPoint } = req.body;
    const result = await time.restStart(studyEndPoint, restStartPoint);
    res.status(200).json({ message: result });
  } catch (err) {
    res.status(400).json({ errMessage: err.message });
  }
};

exports.restEnd = async (req, res) => {
  try {
    const { restEndPoint, studyStartPoint } = req.body;
    const result = await time.restEnd(restEndPoint, studyStartPoint);
    res.status(200).json({ message: result });
    
  } catch (err) {
    res.status(400).json({ errMessage: err.message });
  }
};
