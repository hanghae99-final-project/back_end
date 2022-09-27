const Joi = require("joi");
const Admin = require("../../schemas/admin");
const nodemailer = require("../../models/mail");
const { BadRequestError } = require("../../errors");

exports.checkValidation = async (value) => {
  if (!value.adminEmail) {
    throw new BadRequestError("이메일을 입력해주세요.");
  }
  if (!value.password) {
    throw new BadRequestError("비밀번호를 입력해주세요.");
  }
  if (!value.confirm) {
    throw new BadRequestError("비밀번호를 한번 더 입력해주세요.");
  }
  if (value.password !== value.confirm) {
    throw new BadRequestError("비밀번호 불일치.");
  }

  const adminSchema = Joi.object({
    adminEmail: Joi.string().email().required(),
    password: Joi.string()
      .pattern(
        new RegExp(
          "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$"
        )
      )
      .required(),
    confirm: Joi.ref("password"),
  });

  return await adminSchema.validateAsync(value);
};

exports.createAdmin = async (value) => {
  return await Admin.create({ ...value });
};
exports.login = async (adminEmail, confirmCode, auth_yn) => {
  let message = true;

  if (!confirmCode) {
    message = "인증코드를 입력해주세요.";
    return message;
  }

  //auth_yn가 Y이면
  if (auth_yn === "Y") {
    //checkCode double check를 한다.
    const result = await nodemailer.checkCode(confirmCode, adminEmail);
    if (result !== "success") {
      message = "이메일 인증을 해주세요.";
      return message;
    }
    //모든게 성공적이면 인증코드를 삭제
    const deleteResult = await nodemailer.deleteCode(confirmCode, adminEmail);
    if (deleteResult !== "success") {
      message = "다시 시도해 주세요";
      return message;
    }
  }
  return message;
};

exports.checkAdminEmail = async (adminEmail) => {
  let message = "success";
  const result = await Admin.findOne(adminEmail).exec();
  if (!result) {
    message = "failed";
  }
  return message;
};

exports.sendCode = async (adminEmail) => {
  //random번호 설정
  const randomNumber = Math.floor(Math.random() * 999999);

  //메일 옵션.
  const mailOptions = {
    to: adminEmail,
    subject: "인증번호",
    text: `${randomNumber}`,
  };
  await nodemailer.sendEmailCode(adminEmail, randomNumber);
  return await nodemailer.send(mailOptions);
};

exports.checkCode = async (code, email) => {
  let message = "SUCCESS";
  if (!code) {
    message = "CODE";
    return message;
  } else if (!email) {
    message = "EMAIL";
    return message;
  }
  //인증번호 확인
  const result = await nodemailer.checkCode(code, email);
  if (result === "NO DATA") {
    message = "INCORRECT";
    return message;
  } else if (result === "success") {
    return message;
  }
};
