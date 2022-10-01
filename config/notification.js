const schedule = require("node-schedule");
const Time = require("../schemas/time");
const User = require("../schemas/user");
const { DateTime } = require("luxon");

exports.scheduler = () => {
  schedule.scheduleJob("* * * * * *", async () => {
    const today = DateTime.now();
    const todayStart = new Date(today.startOf("days"));
    const todayEnd = new Date(today.endOf("days"));
    const userNotify = await User.find({ notificationToken: { $ne: null } });
    const tokenArr = [
      "fENQfh3HtC4erqzPegm2NW:APA91bF1DFZv2z6G7C-6PoXmQoK9cT7jiBuoj6IpkC2gwlgzLVz-ffYrtU2rOlssVpypdVjxSrVXTeB1pYr3S9KyrI8yqhKL_On3TEU4jMSLt_6diurguXvPwS6YNQxjmYrR84WI-9No",
    ];
    userNotify.map((element) => {
      tokenArr.push(element.notificationToken);
    });
    console.log(tokenArr);
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

          try {
            const body = {
              //메세지 받을 클라이어튼 토큰 입력
              to: "fENQfh3HtC4erqzPegm2NW:APA91bEo8bX7ZHwidBI1ATisMNrkJfK2xLjnGF-IkA3TLAhlthF5zvCm6Dy7n0C55BChXISP0ABmzVU2GX-GQYydzMXBok7fCsyVybsSNSzlxy6Ru94tavW18AALiyqRzL36YJHzzBWh",
              notification: {
                title: "랭플", //메세지 제목
                body: "랭플 알람입니다", //메세지 내용
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
            schedule.cancelJob("setTime");
          } catch (e) {
            console.log(e);
          }

          await Time.findByIdAndUpdate(time._id, { isGoal: true });
        }
      });
    }
  });
};
