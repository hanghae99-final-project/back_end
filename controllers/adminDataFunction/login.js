const { StatusCodes } = require("http-status-codes");
const adminLoginService = require("../../service/adminService/adminLoginService");
const passport = require("passport");

exports.loginPage = (req, res) => {
  res.render("login");
};
exports.create = async (req, res) => {
  await adminLoginService.checkValidation(req.body);
  await adminLoginService.createAdmin({ ...req.body });
  res.status(StatusCodes.OK).send({ message: "계정이 생성 되었습니다." });
};

// //admin login
// exports.login = async (req, res) => {
//   const { adminEmail, password, confirmCode, auth_yn } = req.body;
//   const result = await adminLoginService.login(
//     adminEmail,
//     password,
//     confirmCode,
//     auth_yn
//   );

//   if (result != true) {
//     return res
//       .status(StatusCodes.BAD_REQUEST)
//       .render("alert/alert", { error: result });
//   }
//   //creating jwt
//   const refreshToken = await adminLoginService.createJWT(adminEmail);
//   //creating refresh token
//   res.cookie("HangHae99", `Bearer ${refreshToken}`, {
//     httpOnly: true,
//     secure: false,
//   });
//   res.status(StatusCodes.OK).redirect("main");
// };
//admin login via passport
exports.login = async (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .render("alert/alert", { error: result });
    }
  });
};

//인증코드 보내는 function
exports.sendCode = async (req, res) => {
  const result = await adminLoginService.checkAdminEmail({
    adminEmail: req.body.id,
  });
  await adminLoginService.sendCode(req.body.id);
  return res.status(StatusCodes.OK).send({ message: result });
};

//인증코드를 확인하는 function
exports.checkCode = async (req, res) => {
  const { code, email } = req.body;
  const result = await adminLoginService.checkCode(code, email);
  return res.status(StatusCodes.OK).send({ message: result });
};

exports.logout = async (req, res) => {
  res.clearCookie(process.env.COOKIE_NAME);

  res.status(StatusCodes.OK).redirect("/");
};
