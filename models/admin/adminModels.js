const User = require("../../schemas/user");

exports.getUserInfoModel = async (userId) => {
  const result = await User.findById({ _id: userId });
  return result;
};
