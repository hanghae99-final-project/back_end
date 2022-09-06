const express = require("express");
const Admin = require("./admin");
const Users = require("./user");
const asyncWrapper = require("../middleware/async");

const router = express.Router();

router.use("/", asyncWrapper(Admin));
router.use("/users", Users);

module.exports = router;
