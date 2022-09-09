const User = require("../schemas/user");
// const User = require("../schemas/user");

exports.getProfile = async (user) => {
  const profile = await User.findOne({ _id: user._id }).select({
    nickname: 1,
    ageGroup: 1,
    specialty: 1,
    spec: 1,
    _id: 0,
  });
  return profile;
};

exports.putProfile = async (user, nickname, ageGroup, specialty) => {
  const result = await User.findOne({
    $and: [{ kakaoId: { $ne: user.kakaoId } }, { nickname }],
  });
  if (result) {
    return false;
  } else {
    await User.findByIdAndUpdate(
      { _id: user._id },
      {
        $set: { nickname: nickname, ageGroup: ageGroup, specialty: specialty },
      },
      { runValidators: true }
    );
  }
  return true;
};

exports.postSpec = async (user, education, career, year, experience) => {
  const myProfile = await User.findOne({ _id: user._id });
  if (myProfile) {
    myProfile.spec.push({ education, career, year, experience });
    const result = await myProfile.save();
    return result.spec[result.spec.length - 1];
  } else {
    throw new Error("아이디가 없습니다.");
  }
};

exports.putSpec = async (user, specId, education, career, year, experience) => {
  const myProfile = await User.findOne({ _id: user._id });
  let specArrIdx = false;
  if (myProfile) {
    myProfile.spec.map((element, idx) => {
      if (element._id.equals(specId)) {
        specArrIdx = idx;
        myProfile.spec[specArrIdx].education = education;
        myProfile.spec[specArrIdx].career = career;
        myProfile.spec[specArrIdx].year = year;
        myProfile.spec[specArrIdx].experience = experience;
      }
    });
    if(!specArrIdx){
      throw new Error("spec id가 존재하지 않습니다.");
    }
    await myProfile.save();
    return true;
  } else {
    throw new Error("user가 존재하지 않습니다.");
  }
};

exports.deleteSpec = async (user, specId) => {
  const myProfile = await User.findOne({ _id: user._id });
  let specArrIdx = false;
  if (myProfile) {
    myProfile.spec.map((element, idx) => {
      if (element._id.equals(specId)) {
        specArrIdx = idx;
        myProfile.spec.splice(specArrIdx, 1);
      }
    });
    if(!specArrIdx){
      throw new Error("spec id가 존재하지 않습니다.");
    }
    await myProfile.save();
    return true;
  } else {
    throw new Error("user가 존재하지 않습니다.");
  }
};

exports.getDday = async (user) => {
    const profile = await User.findOne({ _id: user._id }).select({
      dDay: 1,
      _id: 0,
    });
    return profile.dDay;
  };

exports.postDday = async (user, deadline, content) => {
  const myProfile = await User.findOne({ _id: user._id });
  if (myProfile) {
    myProfile.dDay.push({ deadline, content });
    const result = await myProfile.save();
    return result.dDay[result.dDay.length - 1];
  } else {
    throw new Error("아이디가 없습니다.");
  }
};

exports.putDday = async (user, ddayId, deadline, content) => {
  const myProfile = await User.findOne({ _id: user._id });
  let ddayArrIdx = false;
  if (myProfile) {
    myProfile.dDay.map((element, idx) => {
      if (element._id.equals(ddayId)) {
        ddayArrIdx = idx;
        myProfile.dDay[ddayArrIdx].deadline = deadline;
        myProfile.dDay[ddayArrIdx].content = content;
      }
    });
    if (!ddayArrIdx){
      throw new Error("D-day id가 존재하지 않습니다.");
    }
    await myProfile.save();
    return true;
  } else {
    throw new Error("user가 존재하지 않습니다.");
  }
};

exports.deleteDday = async (user, ddayId) => {
  const myProfile = await User.findOne({ _id: user._id });
  let ddayArrIdx = false;
  if (myProfile) {
    myProfile.dDay.map((element, idx) => {
      if (element._id.equals(ddayId)) {
        ddayArrIdx = idx;
        myProfile.dDay.splice(ddayArrIdx, 1);
      }  
    });
    if(!ddayArrIdx){
      throw new Error("D-day id가 존재하지 않습니다.");
    }
    await myProfile.save();
    return true;
  } else {
    throw new Error("user가 존재하지 않습니다.");
  }
};
