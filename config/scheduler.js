const schedule = require("node-schedule");
const Time = require("../schemas/time");
const Studying = require("../schemas/studying");
const { DateTime } = require("luxon");
exports.scheduler = () => {
  // 한국시각 새벽 2시 공부 시간 초기화 스케쥴 설정
  const rule = new schedule.RecurrenceRule();
  rule.hour = 0;
  rule.minute = 0;
  rule.tz = "Asia/Seoul";
  schedule.scheduleJob(rule, async () => {
    /**
     * 새벽 0시기준으로 어제로 검색해야함
     * today : 오늘 날짜를 받아옴
     * yesterdayStart : subtract함수로 어제날짜를 할당
     *
     * ex)
     * 20일 새벽 0시
     * today : 20XX.XX.20
     * yesterdayStart : 20XX.XX.19 새벽 2시
     * yesterdayEnd : 20XX.XX.20 새벽 1시 59분 59초
     * */
    const today = DateTime.now().startOf("days");
    const yesterdayStart = new Date(today.minus({ days: 1 }));
    const yesterdayEnd = new Date(today.minus({ days: 1 }).endOf("days"));

    // (어제일자) and (공부 시작 시각이 0이 아닐 때 or 휴식 시작 시각이 0이 아닐 때) 공부시간db 검색
    const times = await Time.find({
      $and: [
        {
          createdAt: {
            $gte: yesterdayStart,
            $lte: yesterdayEnd,
          },
        },
        {
          $or: [
            { studyStartPoint: { $ne: 0 } },
            { restStartPoint: { $ne: 0 } },
          ],
        },
      ],
    });

    if (times.length) {
      times.forEach(async (time) => {
        if (time.studyStartPoint !== 0 && time.restStartPoint === 0) {
          time.savedStudyTime += yesterdayEnd.getTime() - time.studyStartPoint;
          time.studyStartPoint = 0;
          await time.save();
        } else if (time.studyStartPoint === 0 && time.restStartPoint !== 0) {
          time.savedRestTime += yesterdayEnd.getTime() - time.restStartPoint;
          time.restStartPoint = 0;
          await time.save();
        } else {
          console.error("포인트에러");
        }
      });
    }
    await Studying.deleteMany({});
  });
};
