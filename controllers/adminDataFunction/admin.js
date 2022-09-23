const { StatusCodes } = require("http-status-codes");
const adminService = require("../../service/adminService/admin");

exports.addObject = (req, res) => {
  const page = req.body.page;
  const data = [];
  data.push(req.body.value);
  res.status(StatusCodes.OK).render(page, data);
};
exports.insQuote = async (req, res) => {
  //quote.length만큼 입력을 받는다.
  const quote = req.body.quote;
  const result = await adminService.create(quote);

  if (!result) {
    res.status(StatusCodes.BAD_REQUEST).render("alert/alert", {
      error: "명언을 입력해주세요.",
    });
  } else {
    res.status(StatusCodes.OK).render("alert/successAlert", {
      message: "입력성공.",
      page: "insQuote",
    });
  }
};

exports.deleteCheckedQuotes = async (req, res) => {
  const quote = req.body.quoteId;
  const result = await adminService.checkedDelete(quote);
  res.send({ message: result });
};
