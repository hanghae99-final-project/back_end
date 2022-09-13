const Quote = require("../models/quotes");
const { StatusCodes } = require("http-status-codes");
exports.getAllQuotes = async (req, res) => {
  const getAllQuotes = await Quote.getAllQuotes();

  const randomNumber = Math.floor(Math.random() * getAllQuotes.length);

  const getOneQuote = await Quote.getOneQuote(randomNumber);

  return res.status(StatusCodes.OK).json({ Quotes: getOneQuote });
};
