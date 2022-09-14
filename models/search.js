const user = require("../schemas/user");

exports.findSearch = async (word) => {
  const result = await user.find({
    nickname: { $regex: word, $options: "i" },
  });
  return result;
};
