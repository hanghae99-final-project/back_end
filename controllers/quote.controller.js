const Quote = require("../models/quote.model");
const { StatusCodes } = require("http-status-codes");
exports.getAllQuotes = async (req, res) => {
  const getAllQuotes = await Quote.getAllQuotes();

  return res.status(StatusCodes.OK).json({ Quotes: getAllQuotes });
};
