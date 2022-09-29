const { StatusCodes } = require("http-status-codes");
const adminService = require("../../service/adminService/admin");

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
