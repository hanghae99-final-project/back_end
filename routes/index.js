const express = require("express");
const Admin = require("./admin");
const Users = require("./user");
const Todo = require("./todo");
const Time = require("./time");
const authMiddleware = require("../middleware/userAuth");

const router = express.Router();

router.use("/", Admin);
router.use("/users", Users);
router.use("/todo", authMiddleware, Todo);
router.use("/time", authMiddleware, Time);

module.exports = router;
