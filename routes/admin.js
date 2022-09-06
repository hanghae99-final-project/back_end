const express = require("express");
const router = express.Router();
const admin = require("../controllers/adminDataFunction/login");
const adminPage = require("../controllers/adminDataFunction/adminPage");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.route("/").get(ensureGuest, admin.loginPage);
// .post(asyncWrapper(Admin.create));
router.route("/login").post(admin.login);
router.route("/logout").get(admin.logout);

router.route("/main").get(ensureAuth, adminPage.mainPage);

module.exports = router;
