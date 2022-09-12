const schedule = require("node-schedule");
const TimeSchema = require("../schemas/time");
const TimeModel = require("../models/time");
const moment = require("moment");

const targetTimeScheduler = async (req, res, next) => {
  const user = req.locals;
  let j = undefined;
  if (req.body.studyStartPoint) {
    let studyStartPoint = req.body.studyStartPoint;
    let savedStudyTime = 0;
    let endTime = 0;
    const today = moment().startOf("day");
    const todayStart = moment(today).startOf("day").add(2, "hours");
    const todayEnd = moment(today).endOf("day").add(2, "hours");
    const existedTime = await TimeSchema.findOne({
      $and: [
        {
          createdAt: {
            $gte: todayStart.toDate(),
            $lte: todayEnd.toDate(),
          },
        },
        { userId: user._id },
      ],
    });
    if (existedTime) {
      console.log("existedTime 있을 때");
      savedStudyTime = existedTime.savedStudyTime;
      endTime = new Date(
        studyStartPoint + (user.targetTime - savedStudyTime) - 60000
      );
    } else {
      console.log("existedTime 없을 때");
      endTime = new Date(studyStartPoint + user.targetTime - 60000);
    }
    if (
      todayEnd.toDate().getTime() >= endTime.getTime() &&
      studyStartPoint < endTime.getTime() &&
      new Date().getTime() < endTime.getTime()
    ) {
      console.log("endTime : ", endTime);
      j = schedule.scheduleJob(endTime, () => {
        TimeModel.studyEnd(endTime.getTime() + 60000, 0, user);
      });
    }
  } else if (req.body.studyEndPoint) {
    console.log("예약 취소");
    if(j){
      j.cancel();
    }

  }

  next();
};
module.exports = targetTimeScheduler;
