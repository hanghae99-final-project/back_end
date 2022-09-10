const express = require("express");
const Admin = require("./admin");
const Users = require("./user");
const Todo = require("./todo");
const Time = require("./time");
const Rank = require("./rank");
const MyPage = require("./myPage");
const Profile = require("./profile");
const NickCheck = require("./nickCheck");
const Studying = require("./studying");
const authMiddleware = require("../middleware/userAuth");
const scheduleMiddleware = require("../middleware/scheduler");

const router = express.Router();

router.use("/", Admin);
router.use("/users", Users);
router.use("/todo", authMiddleware, Todo);
router.use("/time", authMiddleware, scheduleMiddleware, Time);
router.use("/rank", authMiddleware, Rank);
router.use("/mypage", authMiddleware, MyPage);
router.use("/profile",authMiddleware, Profile);
router.use("/check",authMiddleware, NickCheck);
router.use("/studying",authMiddleware, Studying);

module.exports = router;
