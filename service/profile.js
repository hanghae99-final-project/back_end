const profileModels = require("../models/profile");
const userModels = require("../models/userValidation");
const { NotFoundError } = require("../errors");
const { DateTime } = require("luxon");

exports.getProfile = async (user) => {
  let myProfile = {};
  const profile = await profileModels.getProfile(user);

  if (profile) {
    myProfile = {
      nickname: profile.nickname,
      ageGroup: profile.ageGroup,
      specialty: profile.specialty,
      spec: profile.spec,
    };
    return myProfile;
  } else {
    throw new NotFoundError("프로필이 존재하지 않습니다.");
  }
};

exports.putProfile = async (user, nickname, ageGroup, specialty) => {
  // await profileSchema.validateAsync({ nickname, ageGroup, specialty });
  // await userModels.nicknameCheck(nickname);
  // await userModels.ageGroupCheck(ageGroup);
  // await userModels.specialtyCheck(specialty);
  const existedSameNickname = await profileModels.sameNickCheck(user, nickname);

  if (existedSameNickname) {
    return false;
  } else {
    const result = await profileModels.putProfile(
      user,
      nickname,
      ageGroup,
      specialty
    );
    return result;
  }
};

exports.postSpec = async (user, education, career, year, experience) => {
  const myProfile = await profileModels.getProfile(user);

  if (myProfile) {
    myProfile.spec.push({ education, career, year, experience });
    const result = await profileModels.saveProfile(myProfile);
    return result.spec[result.spec.length - 1];
  } else {
    throw new NotFoundError("프로필이 존재하지 않습니다.");
  }
};

exports.putSpec = async (user, specId, education, career, year, experience) => {
  let specArrIdx = false;
  const myProfile = await profileModels.getProfile(user);

  if (myProfile) {
    myProfile.spec.map((element, idx) => {
      if (element._id.equals(specId)) {
        specArrIdx = idx.toString();
        myProfile.spec[idx].education = education;
        myProfile.spec[idx].career = career;
        myProfile.spec[idx].year = year;
        myProfile.spec[idx].experience = experience;
      }
    });
    if (!specArrIdx) {
      throw new NotFoundError("spec id가 존재하지 않습니다.");
    }
    await profileModels.saveProfile(myProfile);
    return true;
  } else {
    throw new NotFoundError("프로필이 존재하지 않습니다.");
  }
};

exports.deleteSpec = async (user, specId) => {
  let specArrIdx = false;
  const myProfile = await profileModels.getProfile(user);

  if (myProfile) {
    myProfile.spec.map((element, idx) => {
      if (element._id.equals(specId)) {
        specArrIdx = idx.toString();
        myProfile.spec.splice(idx, 1);
      }
    });
    if (!specArrIdx) {
      throw new NotFoundError("spec id가 존재하지 않습니다.");
    }
    await profileModels.saveProfile(myProfile);
    return true;
  } else {
    throw new NotFoundError("프로필이 존재하지 않습니다.");
  }
};

exports.getDday = async (user) => {
  const myProfile = await profileModels.getProfile(user);

  if (myProfile) {
    const myDday = myProfile.dDay;
    return myDday.sort(
      (a, b) => new Date(b.deadline).getTime() - new Date(a.deadline).getTime()
    );
  } else {
    throw new NotFoundError("프로필이 존재하지 않습니다.");
  }
};

exports.postDday = async (user, deadline, content) => {
  const myProfile = await profileModels.getProfile(user);

  if (myProfile) {
    myProfile.dDay.push({ deadline, content });
    const result = await profileModels.saveProfile(myProfile);
    return result.dDay[result.dDay.length - 1];
  } else {
    throw new NotFoundError("프로필이 존재하지 않습니다.");
  }
};

exports.putDday = async (user, ddayId, deadline, content) => {
  let ddayArrIdx = false;
  const myProfile = await profileModels.getProfile(user);

  if (myProfile) {
    myProfile.dDay.map((element, idx) => {
      if (element._id.equals(ddayId)) {
        ddayArrIdx = idx.toString();
        myProfile.dDay[idx].deadline = deadline;
        myProfile.dDay[idx].content = content;
      }
    });
    if (!ddayArrIdx) {
      throw new NotFoundError("D-day id가 존재하지 않습니다.");
    }
    await profileModels.saveProfile(myProfile);
    return true;
  } else {
    throw new NotFoundError("프로필이 존재하지 않습니다.");
  }
};

exports.deleteDday = async (user, ddayId) => {
  let ddayArrIdx = false;
  const myProfile = await profileModels.getProfile(user);

  if (myProfile) {
    myProfile.dDay.map((element, idx) => {
      if (element._id.equals(ddayId)) {
        ddayArrIdx = idx.toString();
        myProfile.dDay.splice(idx, 1);
      }
    });
    if (!ddayArrIdx) {
      throw new NotFoundError("D-day id가 존재하지 않습니다.");
    }
    await profileModels.saveProfile(myProfile);
    return true;
  } else {
    throw new NotFoundError("프로필이 존재하지 않습니다.");
  }
};

exports.getNickCheck = async (user, nickname) => {
  await userModels.nicknameSchema.validateAsync({ nickname });
  const result = await profileModels.sameNickCheck(user, nickname);
  if (result) {
    return false;
  } else {
    return true;
  }
};

exports.getDdayOne = async (user) => {
  const today = DateTime.now().toMillis();
  const myProfile = await profileModels.getProfile(user);

  if (myProfile) {
    const myDday = myProfile.dDay;
    const myDdayFilter = myDday.filter((dday)=>{
      const day = DateTime.fromISO(dday.deadline).toMillis();
      return today<day;
    })
    if(myDdayFilter.length){
      return [myDdayFilter.sort(
        (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
      )[0]];
    }
    else {
      return [];
    }

  } else {
    throw new NotFoundError("프로필이 존재하지 않습니다.");
  }
};