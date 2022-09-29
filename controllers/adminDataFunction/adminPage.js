const { StatusCodes } = require("http-status-codes");
const adminService = require("../../service/adminService/admin");
const webpush = require("web-push");
const publicVapidKey = process.env.WEB_PUSH_PUBLIC_KEY;
const privateVapidKey = process.env.WEB_PUSH_PRIVATE_KEY;

webpush.setVapidDetails(
  "mailto:dev.calvinpark@gmail.com",
  publicVapidKey,
  privateVapidKey
);

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
//localhost:3000/webPush const data를 가져간다. view파일의 webPush.ejs이도
exports.webPush = async (req, res) => {
  const data = process.env.WEB_PUSH_PUBLIC_KEY;
  res.status(StatusCodes.OK).render("webPush", { data });
};
exports.webPushPost = async (req, res) => {
  // worker.js에 있는 내용들
  const subscription = req.body;

  // Send 201 - resource created
  res.status(201).json({});

  // Create payload
  const payload = JSON.stringify({ title: "알림 보내기!!!!" });

  // Pass object into sendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch((err) => console.error(err));
};
