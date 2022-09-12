const User = require("../../schemas/user");
const { StatusCodes } = require("http-status-codes");

exports.mainPage = async (req, res) => {
  const user = await User.find({});
  res.status(StatusCodes.OK).render("main/main", { data: user });
};
exports.insQuote = async (req, res) => {
  res.status(StatusCodes.OK).render("main/insQuotePage");
};
