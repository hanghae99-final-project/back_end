const { StatusCodes } = require("http-status-codes");
const adminService = require("../../service/adminService/admin");
const schedule = require("node-schedule");

exports.mainPage = async (req, res) => {
  let { where } = req.query;
  const result = await adminService.findSearch(where);
  const totalUser = await adminService.totalUser();

  res
    .status(StatusCodes.OK)
    .render("main/main", { data: result, where, totalUser: totalUser.length });
};
exports.insQuotePage = async (req, res) => {
  const quotes = await adminService.quoteFind({});
  res.status(StatusCodes.OK).render("main/insQuotePage", { data: quotes });
};
exports.getUserInfoPage = async (req, res) => {
  const { userId } = req.params;
  const data = await adminService.getUserInfo(userId);
  res.status(StatusCodes.OK).render("main/user", { data });
};
exports.sendNotification = async (req, res) => {
  const token = Object.keys(req.body);
  const tokenArr = [];
  token.map((i) => {
    tokenArr.push(i);
  });

  try {
    const body = {
      //메세지 받을 클라이어튼 토큰 입력
      to: tokenArr[0],
      notification: {
        title: "페이지 꺼졌을때 타이틀", //메세지 제목
        body: "안쪽", //메세지 내용
        click_action: "https://ranking-planner.com", //클릭시 홈페이지 이동
        icon: "/firebase-logo.png", //사용자 프로필 오면 좋을듯
      },
    };

    schedule.scheduleJob("setTime", "* * * * * *", async () => {
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
    });
  } catch (e) {
    console.log(e);
  }
};
