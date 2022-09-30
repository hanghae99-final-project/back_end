const User = require("../schemas/user");

exports.getProfile = async (user) => {
  const profile = await User.findOne({ _id: user._id });
  return profile;
};

exports.sameNickCheck = async (user, nickname) => {
  const existedSameNickname = await User.findOne({
    $and: [{ kakaoId: { $ne: user.kakaoId } }, { nickname }],
  });
  return existedSameNickname;
};

exports.putProfile = async (user, nickname, ageGroup, specialty) => {
  await User.findByIdAndUpdate(
    { _id: user._id },
    {
      $set: { nickname, ageGroup, specialty },
    },
    { runValidators: true }
  );
  return true;
};

exports.saveProfile = async (Profile) => {
  const result = await Profile.save();
  return result;
};
