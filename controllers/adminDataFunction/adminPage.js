const Quotes = require("../../schemas/quote");
const Search = require("../../models/search");
const { StatusCodes } = require("http-status-codes");
const moment = require("moment-timezone");
const dateKorea = moment().tz("Asia/Seoul").format();

exports.mainPage = async (req, res) => {
  let { where } = req.query;
  if (!where) {
    where = "";
  }
  const result = await Search.findSearch(where);
  res.status(StatusCodes.OK).render("main/main", { data: result, where });
};
exports.insQuotePage = async (req, res) => {
  const quotes = await Quotes.find({});
  res.status(StatusCodes.OK).render("main/insQuotePage", { data: quotes });
};
