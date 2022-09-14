const User = require("../../schemas/user");
const Quotes = require("../../schemas/quote");
const { StatusCodes } = require("http-status-codes");
const moment = require("moment-timezone");
const dateKorea = moment().tz("Asia/Seoul").format();

exports.mainPage = async (req, res) => {
  const user = await User.find({});
  res.status(StatusCodes.OK).render("main/main", { data: user });
};
exports.insQuotePage = async (req, res) => {
  const quotes = await Quotes.find({});
  console.log(dateKorea);

  res.status(StatusCodes.OK).render("main/insQuotePage", { data: quotes });
};
