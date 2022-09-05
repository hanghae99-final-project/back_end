const express = require("express");
const router = express.Router();
const asyncWrapper = require("../middleware/async");
const Admin = require("../controllers/adminDataFunction/login");

router.route("/").get(Admin.main).post(asyncWrapper, Admin.create);
router.route("/login").post(Admin.login);

module.exports = router;
