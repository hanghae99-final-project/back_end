const Quote = require("../models/quote.model");
const { StatusCodes } = require("http-status-codes");
exports.getAllQuotes = async (req, res) => {
  const getRandomQuote = await Quote.getRandomQuote();

  return res.status(StatusCodes.OK).json({ Quotes: getRandomQuote });
};
