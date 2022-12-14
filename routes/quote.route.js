const express = require("express");
const router = express.Router();
const Quote = require("../controllers/quote.controller");

const asyncWrapper = require("../middleware/async");

router.route("/").get(asyncWrapper(Quote.getAllQuotes));

module.exports = router;
