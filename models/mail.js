const ConfirmNumber = require("../schemas/confirmNumber");
const nodemailer = require("nodemailer");

const config = {
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GOOGLE_MAIL,
    pass: process.env.GOOGLE_PASSWORD,
  },
};

//이메일 보내기
exports.send = async (data) => {
  const transporter = nodemailer.createTransport(config);
  transporter.sendMail(data, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      return info.response;
    }
  });
};

//인증번호 DB에 저장
exports.sendEmailCode = async (email, randomNumber) => {
  //이메일이 있는지 확인
  const result = await ConfirmNumber.findOne({ email });
  if (result) {
    //있으면 인증코드 업데이트
    await ConfirmNumber.findOneAndUpdate(
      { email },
      { authNumber: randomNumber }
    );
  } else {
    //없으면 저장
    await ConfirmNumber.create({ authNumber: randomNumber, email });
  }
};

//인증번호 확인
exports.checkCode = async (code, email) => {
  let result = "success";
  //인증번호 및 이메일을 확인
  const data = await ConfirmNumber.find({ authNumber: code, email });
  //없으면 NO DATA를 리턴
  if (data.length <= 0) {
    result = "NO DATA";
  }
  return result;
};
//인증코드를 삭제
exports.deleteCode = async (code, email) => {
  let result = "success";
  if (code && email) {
    await ConfirmNumber.findOneAndRemove({ authNumber: code, email });
  } else {
    return false;
  }
  return result;
};
