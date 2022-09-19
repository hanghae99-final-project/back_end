const adminModel = require("../../models/admin/adminModels");
exports.getUserInfo = async (userId) => {
  return await adminModel.getUserInfoModel(userId);
};
