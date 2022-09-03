const express = require("express");
const Users = require("./user");

const router = express.Router();

router.use("/users", Users);

module.exports = router;