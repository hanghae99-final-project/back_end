const Studying = require("../schemas/studying");

exports.getStudying = async () => {
    const existedStudying = await Studying.find({});
    return existedStudying;
};

exports.startStudying = async(user) =>{
    await Studying.create({ kakaoId: user.kakaoId, nickname: user.nickname });
}

exports.endStudying = async(user) =>{
    await Studying.deleteMany({ kakaoId: user.kakaoId });
}