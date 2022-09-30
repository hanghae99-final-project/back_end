const express = require("express");
const router = express.Router();
const Studying = require("../controllers/studying.controller");

const asyncWrapper = require("../middleware/async");

router.route("/").get(asyncWrapper(Studying.getStudyingCount));

module.exports = router;
