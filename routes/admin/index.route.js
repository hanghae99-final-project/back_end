const express = require("express");
const router = express.Router();
const admin = require("../../controllers/adminDataFunction/login.controller");
const adminData = require("../../controllers/adminDataFunction/admin.controller");
const adminPage = require("../../controllers/adminDataFunction/adminPage.controller");
const { isLoggedIn, isNotLoggedIn } = require("../../middleware/auth");

const asyncWrapper = require("../../middleware/async");
//로그인 페이지
router.route("/").get(isNotLoggedIn, admin.loginPage).post(admin.create);
//로그인
router.route("/login").post(asyncWrapper(admin.login));
//로그아웃
router.route("/logout").get(isLoggedIn, admin.logout);
//추가 input text
router.route("/addObject").post(asyncWrapper(adminData.addObject));
//명언 삭제
router
  .route("/deleteCheckedQuotes")
  .delete(isLoggedIn, asyncWrapper(adminData.deleteCheckedQuotes));
//이메일 인증코드 보내기
router.route("/sendCode").post(asyncWrapper(admin.sendCode));
//이메일 인증 코드 확인
router.route("/checkCode").post(asyncWrapper(admin.checkCode));
//로그인 후 보요여줄 메인 페이지
router.route("/main").get(isLoggedIn, adminPage.mainPage);
//명언 추가 페이지
router.route("/insQuote").get(isLoggedIn, asyncWrapper(adminPage.insQuotePage));
//명언 추가
router.route("/insQuote").post(isLoggedIn, asyncWrapper(adminData.insQuote));
//유저 정보 보기
router
  .route("/user/:userId")
  .get(isLoggedIn, asyncWrapper(adminPage.getUserInfoPage));

module.exports = router;
