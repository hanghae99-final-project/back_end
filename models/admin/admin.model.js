const User = require("../../schemas/user");
const Quote = require("../../schemas/quote");

exports.getUserInfoModel = async (userId) => {
  const result = await User.findById({ _id: userId });
  return result;
};
exports.getAllUsers = async () => {
  return await User.find({});
};
exports.getSingleQuoteInfo = async (quoteId) => {
  return await Quote.findById({ _id: quoteId });
};
exports.modQuote = async (quoteId, quote) => {
  return Quote.findOneAndUpdate({ _id: quoteId, title: quote });
};
