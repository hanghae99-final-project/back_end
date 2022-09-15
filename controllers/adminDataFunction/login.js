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
  const { adminEmail, password } = req.body;
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

exports.sendCode = async (req, res) => {
  const mailOptions = {
    from: process.env.GOOGLE_MAIL,
    to: req.body.id,
    subject: "인증번호",
    text: "random 번호",
  };
  const r = await nodemailer.send(mailOptions);
  console.log(r);
};

exports.checkCode = async (req, res) => {
  console.log(req.body);
};

exports.logout = async (req, res) => {
  res.clearCookie(process.env.COOKIE_NAME);

  res.status(StatusCodes.OK).redirect("/");
};
