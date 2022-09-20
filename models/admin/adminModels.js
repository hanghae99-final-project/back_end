const User = require("../../schemas/user");

exports.getUserInfoModel = async (userId) => {
  return await User.findById({ _id: userId });
};
