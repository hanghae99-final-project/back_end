const express = require("express");
const Admin = require("../routes/admin/index");
const Users = require("./user");
const Todo = require("./todo");
const Time = require("./time");
const Rank = require("./rank");
const MyPage = require("./myPage");
const Profile = require("./profile");
const Studying = require("./studying");
const Quote = require("./quote");
const authMiddleware = require("../middleware/userAuth");
const webpush = require("web-push");
const publicVapidKey = process.env.WEB_PUSH_PUBLIC_KEY;
const privateVapidKey = process.env.WEB_PUSH_PRIVATE_KEY;
webpush.setVapidDetails(
  "mailto:dev.calvinpark@gmail.com",
  publicVapidKey,
  privateVapidKey
);

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
// Subscribe Route
router.post("/subscribe", (req, res) => {
  //Get pushSubscription Object
  const subscription = req.body;

  // Send 201 - resource created
  res.status(201).json({});

  // Create payload
  const payload = JSON.stringify({ title: "Push Test" });

  // Pass Object into sendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch((err) => console.error(err));
});

// router.use("/forum", authMiddleware, Forum);
// router.use("/bookmark",authMiddleware, Bookmark);

module.exports = router;
