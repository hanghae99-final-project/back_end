const bcrypt = require("bcryptjs");

exports.comparePassword = async (candidatePassword, comparePassword) => {
  const isMatch = await bcrypt.compare(candidatePassword, comparePassword);
  return isMatch;
};
