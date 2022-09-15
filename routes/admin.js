const express = require("express");
const router = express.Router();
const admin = require("../controllers/adminDataFunction/login");
const adminData = require("../controllers/adminDataFunction/admin");
const adminPage = require("../controllers/adminDataFunction/adminPage");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

const asyncWrapper = require("../middleware/async");

router.route("/").get(ensureGuest, asyncWrapper(admin.loginPage)); //   .post(asyncWrapper(admin.create));

router.route("/login").post(asyncWrapper(admin.login));
router.route("/logout").get(admin.logout);
router.route("/addObject").post(asyncWrapper(adminData.addObject));
router
  .route("/deleteCheckedQuotes")
  .delete(asyncWrapper(adminData.deleteCheckedQuotes));
router.route("/sendCode").post(asyncWrapper(admin.sendCode));
router.route("/checkCode").post(asyncWrapper(admin.checkCode));
router.route("/main").get(ensureAuth, adminPage.mainPage);
// //검색
// router.route("/search").get(ensureAuth, adminData.search);
router.route("/insQuote").get(ensureAuth, adminPage.insQuotePage);
router.route("/insQuote").post(ensureAuth, adminData.insQuote);

module.exports = router;
