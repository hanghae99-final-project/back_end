const Admin = require("../../schemas/admin");
const adminModel = require("../../models/adminLogin");
const Joi = require("joi");
const loginModel = require("../../models/login");
const nodemailer = require("../../models/mail");
const { StatusCodes } = require("http-status-codes");

exports.loginPage = (req, res) => {
  res.render("login");
};
exports.create = async (req, res) => {
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

  const { adminEmail, password, confirm } = await adminSchema.validateAsync(
    req.body
  );
  if (!adminEmail) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ message: "이메일 필수 입력" });
  }
  if (password !== confirm) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ message: "비밀번호 불일치" });
  }

  const admin = await Admin.create({ ...req.body });
  res.status(StatusCodes.OK).send({ message: "계정이 생성 되었습니다." });
};

//admin login
exports.login = async (req, res) => {
  const { adminEmail, password, confirmCode, auth_yn } = req.body;
  if (!adminEmail) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .render("alert/alert", { error: "아이디를 입력해주세요." });
  }
  if (!password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .render("alert/alert", { error: "비밀번호를 입력해주세요." });
  }
  if (!confirmCode) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .render("alert/alert", { error: "인증코드를 입력해주세요." });
  }
  //auth_yn가 Y이면
  if (auth_yn === "Y") {
    //checkCode double check를 한다.
    const result = await nodemailer.checkCode(confirmCode, adminEmail);
    if (result !== "success") {
      return res
        .status(StatusCodes.OK)
        .render("alert/alert", { error: "이메일 인증을 해주세요." });
    }
    //모든게 성공적이면 인증코드를 삭제
    const deleteResult = await nodemailer.deleteCode(confirmCode, adminEmail);
    if (deleteResult !== "success") {
      return res
        .status(StatusCodes.OK)
        .render("alert/alert", { error: "다시 시도해 주세요." });
    }
  }
  // find admin
  const admin = await Admin.findOne({ adminEmail });
  if (!admin) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .render("alert/alert", { error: "비밀번호 또는 아이디가 틀립니다." });
  }
  //check password
  const checkPassword = await adminModel.comparePassword(
    password,
    admin.password
  );
  if (!checkPassword) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .render("alert/alert", { error: "비밀번호 또는 아이디가 틀립니다." });
  }

  // req.session.admin = admin._id;
  //creating jwt
  const token = loginModel.createJWT(admin);
  //creating refresh token
  const refreshToken = loginModel.createRefresh(admin);

  //refreshToken db에 저장
  await Admin.findOneAndUpdate({ adminEmail }, { refreshToken });

  res.cookie(process.env.COOKIE_NAME, `Bearer ${refreshToken}`, {
    httpOnly: true,
    secure: false,
  });

  res.status(StatusCodes.OK).redirect("main");
};

//인증코드 보내는 function
exports.sendCode = async (req, res) => {
  let message = "success";
  const result = await Admin.findOne({ adminEmail: req.body.id });
  if (!result) {
    message = "failed";
    return res.status(StatusCodes.OK).send({ message });
  }
  //random번호 설정
  const randomNumber = Math.floor(Math.random() * 999999);

  //메일 옵션.
  const mailOptions = {
    to: req.body.id,
    subject: "인증번호",
    text: `${randomNumber}`,
  };

  await nodemailer.sendEmailCode(req.body.id, randomNumber);
  //이메일 보내기
  await nodemailer.send(mailOptions);
  return res.status(StatusCodes.OK).send({ message });
};

//인증코드를 확인하는 function
exports.checkCode = async (req, res) => {
  let message = "SUCCESS";
  const { code, email } = req.body;
  //없으면 return
  if (!code) {
    message = "CODE";
    return res.status(StatusCodes.OK).send({ message });
  } else if (!email) {
    message = "EMAIL";
    return res.status(StatusCodes.OK).send({ message });
  }

  //인증번호 확인
  const result = await nodemailer.checkCode(code, email);

  //ajax하는 부분
  if (result === "NO DATA") {
    message = "INCORRECT";
    return res.status(StatusCodes.OK).send({ message });
  } else if (result === "success") {
    return res.status(StatusCodes.OK).send({ message });
  }
};

exports.logout = async (req, res) => {
  res.clearCookie(process.env.COOKIE_NAME);

  res.status(StatusCodes.OK).redirect("/");
};
