const express = require("express");
const Admin = require("./admin/index");
const Users = require("./user.route");
const Todo = require("./todo.route");
const Time = require("./time.route");
const Rank = require("./rank.route");
const MyPage = require("./myPage.route");
const Profile = require("./profile.route");
const Studying = require("./studying.route");
const Quote = require("./quote.route");
const authMiddleware = require("../middleware/userAuth");

// const Forum = require("./forum");
// const Bookmark = require("./bookmark");

const router = express.Router();

router.use("/", Admin);
router.use("/users", Users);
router.use("/todo", authMiddleware, Todo);
router.use("/time", authMiddleware, Time);
router.use("/rank", authMiddleware, Rank);
router.use("/mypage", authMiddleware, MyPage);
router.use("/profile", authMiddleware, Profile);
router.use("/quote", authMiddleware, Quote);
router.use("/studying", authMiddleware, Studying);

// router.use("/forum", authMiddleware, Forum);
// router.use("/bookmark",authMiddleware, Bookmark);

module.exports = router;
