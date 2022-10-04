const Quote = require("../schemas/quote");

exports.create = async (quote) => {
  const getAllQuotes = await Quote.find({});
  for (let i = 0; i < quote.length; i++) {
    await Quote.create({ title: quote[i], number: getAllQuotes.length++ });
  }
  return "success";
};

exports.getAllQuotes = async () => {
  const count = await Quote.count({});

  const random = Math.floor(Math.random() * count);

  const getAllQuotes = await Quote.findOne().skip(random).exec();

  return getAllQuotes;
};
exports.getOneQuote = async (number) => {
  const getOneQuote = await Quote.findOne({ number });
  return getOneQuote;
};

exports.checkedDelete = async (checked) => {
  for (let i = 0; i < checked.length; i++) {
    await Quote.findOneAndDelete({ _id: checked[i] });
  }
  return "success";
};
