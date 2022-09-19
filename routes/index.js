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
const Quote = require("./quote");
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
router.use("/profile",authMiddleware, Profile);
router.use("/check",authMiddleware, NickCheck);
router.use("/quote", authMiddleware, Quote);
router.use("/studying",authMiddleware, Studying);

// router.use("/forum", authMiddleware, Forum);
// router.use("/bookmark",authMiddleware, Bookmark);

module.exports = router;
