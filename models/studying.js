const Studying = require("../schemas/studying");
// const User = require("../schemas/user");

exports.getStudying = async () => {
    const existedStudying = await Studying.find({});
    //const result = await Detail.countDocuments({});
    return existedStudying;
};