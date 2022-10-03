const { StatusCodes } = require("http-status-codes");
const adminService = require("../../service/adminService/admin.service");

exports.mainPage = async (req, res) => {
  let { where } = req.query;
  const result = await adminService.findSearch(where);
  const totalUser = await adminService.totalUser();

  res
    .status(StatusCodes.OK)
    .render("main/main", { data: result, where, totalUser: totalUser.length });
};
exports.insQuotePage = async (req, res) => {
  const quotes = await adminService.quoteFind({});
  res.status(StatusCodes.OK).render("main/insQuotePage", { data: quotes });
};
exports.getUserInfoPage = async (req, res) => {
  const { userId } = req.params;
  const data = await adminService.getUserInfo(userId);
  res.status(StatusCodes.OK).render("main/user", { data });
};
exports.getQuote = async (req, res) => {
  const { quoteId } = req.params;
  const data = await adminService.getQuoteInfo(quoteId);
  console.log(data);
  res.status(StatusCodes.OK).render("main/quotePage", { data });
};
