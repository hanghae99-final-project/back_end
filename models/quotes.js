const Quote = require("../schemas/quote");

exports.getAllQuotes = async () => {
  const getAllQuotes = await Quote.find({});
  return getAllQuotes;
};
