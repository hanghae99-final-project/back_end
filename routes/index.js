const express = require("express");
const Admin = require("./admin");
const Users = require("./user");
const Todo = require("./todo");
const Time = require("./time");
const authMiddleware = require("../middleware/userAuth");
const scheduleMiddleware = require("../middleware/scheduler");

const router = express.Router();
const schedule = require("node-schedule");

router.use("/", Admin);
router.use("/users", Users);
router.use("/todo", authMiddleware, Todo);
router.use("/time", authMiddleware, scheduleMiddleware, Time);
router.get("/sche",getTest);
function getTest(req, res){
    let job = schedule.scheduleJob("1 * * * *", function(){
        console.log("1분마다 스케쥴러가 작동돼!");
    })
}

module.exports = router;
