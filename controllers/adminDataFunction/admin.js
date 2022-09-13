const Quote = require("../../schemas/quote");
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
  for (let i = 0; i < quote.length; i++) {
    await Quote.create({ title: quote[i] });
  }

  res.status(StatusCodes.OK).render("alert/successAlert", {
    message: "입력성공.",
    page: "main",
  });
};

exports.deleteCheckedQuotes = async (req, res) => {
  const quote = req.body.quoteId;
  for (let i = 0; i < quote.length; i++) {
    await Quote.findOneAndDelete({ _id: quote[i] });
  }

  res.send({ message: "success" });
};
