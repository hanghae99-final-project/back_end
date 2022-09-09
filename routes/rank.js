const express = require("express");
const router = express.Router();
const RankController = require("../controllers/rank");

router.route("/").get(RankController.getRank);

module.exports = router;