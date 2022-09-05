const express = require("express");
const Admin = require("./admin");
const Users = require("./user");

const router = express.Router();

router.use("/", Admin);
router.use("/users", Users);

module.exports = router;
