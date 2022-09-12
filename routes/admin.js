const express = require("express");
const router = express.Router();
const admin = require("../controllers/adminDataFunction/login");
const adminPage = require("../controllers/adminDataFunction/adminPage");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

const asyncWrapper = require("../middleware/async");

router.route("/").get(ensureGuest, asyncWrapper(admin.loginPage)); //   .post(asyncWrapper(admin.create));
router.route("/login").post(asyncWrapper(admin.login));
router.route("/logout").get(admin.logout);
// router.route("/sendCode").post(admin.sendCode);

router.route("/main").get(ensureAuth, adminPage.mainPage);
router.route("/insQuote").get(ensureAuth, adminPage.insQuote);

module.exports = router;
