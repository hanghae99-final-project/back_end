const schedule = require("node-schedule");
const Time = require("../schemas/time");
const { DateTime } = require("luxon");

exports.scheduler = () => {
  schedule.scheduleJob("*/1 * * * *", async () => {
    const today = DateTime.now();
    const todayStart = new Date(today.startOf("days"));
    const todayEnd = new Date(today.endOf("days"));
    const times = await Time.aggregate([
      {
        $match: {
          $and: [
            {
              createdAt: {
                $gte: todayStart,
                $lte: todayEnd,
              },
            },
            { studyStartPoint: { $ne: 0 } },
            { isGoal: false },
          ],
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userId",
        },
      },
      {
        $unwind: "$userId",
      },
    ]);

    if (times.length) {
      times.forEach(async (time) => {
        if (
          time.userId.targetTime <=
          today.toMillis() - time.studyStartPoint + time.savedStudyTime
        ) {
          /*
           * 여기에 알람을 넣기
           * 알람을 여기에 !!!!
           * 여기에 넣으면 됩니다!!!!!
           * 여기 공간 있어요!
           * 요기여기야기! 기둥 뒤에 공간 있어요!
           */
          await Time.findByIdAndUpdate(time._id, { isGoal: true });
        }
      });
    }
  });
};
