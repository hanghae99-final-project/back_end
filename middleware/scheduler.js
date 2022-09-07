const schedule = require("node-schedule");
const Time = require("../schemas/time");
const moment = require("moment");

const scheduler = (req, res, next) => {
  //check header
  const rule = new schedule.RecurrenceRule();
  rule.hour = 2;
  rule.tz = "Asia/Seoul";
  schedule.scheduleJob(rule, async () => {
    const now = new Date();
    const today = moment().startOf("day");
    const yesterday = moment(today).subtract(1, "day");
    const times = await Time.find({
        // test 위해 today로 바꿔놓았음. 원래는 yesterday
        createdAt: {
            $gte: yesterday.toDate(),
            $lte: moment(yesterday).endOf("day").toDate(),
          }
    });
    times.forEach(async time => {
        if (time.studyStartPoint !== 0 && time.restStartPoint ===0) {
            time.savedStudyTime += now.getTime() - time.studyStartPoint;
            time.studyStartPoint = 0;
            await time.save();
        }
        else if(time.studyStartPoint === 0 && time.restStartPoint !==0){
            time.savedRestTime += now.getTime() - time.restStartPoint;
            time.restStartPoint = 0;
            await time.save();
        }
        else{
            throw new Error("포인트 에러");
        }
    })
  });
  next();
};
module.exports = scheduler;
