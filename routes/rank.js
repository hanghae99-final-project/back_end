const express = require("express");
const router = express.Router();
const RankController = require("../controllers/rank");
const asyncWrapper = require("../middleware/async");

router.route("/").get(asyncWrapper(RankController.getRank));

module.exports = router;