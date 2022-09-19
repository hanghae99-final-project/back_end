const schedule = require("node-schedule");
const Time = require("./schemas/time");
const Studying = require("./schemas/studying");
const moment = require("moment");

exports.scheduler = () => {
  // schedule.scheduleJob("1 * * * * *", () => {
  //     console.log("1분마다 실행");
  //   });
  
  const rule = new schedule.RecurrenceRule();
  rule.hour = 2;
  rule.tz = "Asia/Seoul";

  schedule.scheduleJob(rule, async () => {
    const today = moment().startOf("day");
    const yesterdayStart = moment(today).subtract(1, "day").add(2, "hours"); // moment(today).add(-1,"days")도 동일
    const yesterdayEnd = moment(yesterdayStart).endOf("day").add(2, "hours");
    const times = await Time.find({
      // test 위해 today로 바꿔놓았음. 원래는 yesterday
      createdAt: {
        $gte: yesterdayStart.toDate(),
        $lte: yesterdayEnd.toDate(),
      },
    });
    times.forEach(async (time) => {
      if (time.studyStartPoint !== 0 && time.restStartPoint === 0) {
        time.savedStudyTime +=
          yesterdayEnd.toDate().getTime() - time.studyStartPoint;
        time.studyStartPoint = 0;
        await time.save();
      } else if (time.studyStartPoint === 0 && time.restStartPoint !== 0) {
        time.savedRestTime +=
          yesterdayEnd.toDate().getTime() - time.restStartPoint;
        time.restStartPoint = 0;
        await time.save();
      } else {
        throw new Error("포인트 에러");
      }
    });
    await Studying.deleteMany({});
  });
};
