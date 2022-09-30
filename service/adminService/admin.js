const adminModel = require("../../models/admin/adminModels");
const Quote = require("../../models/quote.model");
const Search = require("../../models/search");
exports.getUserInfo = async (userId) => {
  return await adminModel.getUserInfoModel(userId);
};

exports.create = async (quote) => {
  if (quote[0] === "") {
    return false;
  }
  return await Quote.create(quote);
};
exports.checkedDelete = async (quote) => {
  return await Quote.checkedDelete(quote);
};

exports.quoteFind = async () => {
  return await Quote.getAllQuotes({});
};

exports.findSearch = async (where) => {
  if (!where) {
    where = "";
  }
  return await Search.findSearch(where);
};
exports.totalUser = async () => {
  return await adminModel.getAllUsers();
};
