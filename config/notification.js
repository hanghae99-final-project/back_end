const schedule = require("node-schedule");
const Time = require("../schemas/time");
const { DateTime } = require("luxon");

exports.scheduler = () => {
  schedule.scheduleJob("*/5 * * * *", async () => {
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
          if (time.userId.notificationToken) {
            try {
              const body = {
                //메세지 받을 클라이어튼 토큰 입력
                to: time.userId.notificationToken,
                notification: {
                  title: "랭플", //메세지 제목
                  body: "랭플 알람입니다", //메세지 내용
                  click_action: "https://ranking-planner.com", //클릭시 홈페이지 이동
                  icon: "/firebase-logo.png", //사용자 프로필 오면 좋을듯
                },
              };
              console.log("메세지 전송 성공");
              //fcm서버에 http 통신을 통해 위 알림내용 보내기
              await fetch("https://fcm.googleapis.com/fcm/send", {
                method: "post",
                body: JSON.stringify(body),
                headers: {
                  //보내는 양식
                  "Content-Type": "application/json",
                  //서버키 입력
                  Authorization: `key=${process.env.FIREBASE_Authorization}`,
                },
              });
            } catch (e) {
              console.log(e);
            }
          }

          await Time.findByIdAndUpdate(time._id, { isGoal: true });
        }
      });
    }
  });
};
