const Quote = require("../../models/quotes");
const Search = require("../../models/search.js");
const { StatusCodes } = require("http-status-codes");

exports.addObject = (req, res) => {
  const page = req.body.page;
  const data = [];
  data.push(req.body.value);
  res.status(StatusCodes.OK).render(page, data);
};
exports.insQuote = async (req, res) => {
  const quote = req.body.quote;
  //quote.length만큼 입력을 받는다.

  const result = await Quote.create(quote);
  console.log(result);

  res.status(StatusCodes.OK).render("alert/successAlert", {
    message: "입력성공.",
    page: "main",
  });
};

exports.deleteCheckedQuotes = async (req, res) => {
  const quote = req.body.quoteId;

  const result = await Quote.checkedDelete(quote);

  res.send({ message: result });
};
// exports.search = async (req, res) => {
//   const { where } = req.query;
//   const result = await Search.findSearch(where);

//   res
//     .status(StatusCodes.OK)
//     .render("main/main", { data: result, where: where });
// };
