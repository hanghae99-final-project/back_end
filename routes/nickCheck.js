const express = require("express");
const router = express.Router();
const NickCheck = require("../controllers/nickCheck");

const asyncWrapper = require("../middleware/async");

router.route("/nick/:nickname").get(asyncWrapper(NickCheck.getNickCheck));

module.exports = router;