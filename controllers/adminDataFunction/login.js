const { StatusCodes } = require("http-status-codes");
const adminLoginService = require("../../service/adminService/adminLogin");
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
  passport.authenticate("local", (authError, admin, info) => {
    if (authError) {
      return next(authError);
    }
    if (!admin) {
      res.status(StatusCodes.BAD_REQUEST).render("alert/alert", {
        error: info.message,
      });
    }
    const { adminEmail, confirmCode, auth_yn } = req.body;
    const result = adminLoginService
      .login(adminEmail, confirmCode, auth_yn)
      .then((data) => {
        if (data) {
          return req.login(
            admin,
            (admin,
            (loginError) => {
              if (loginError) {
                console.error(loginError);
                return next(loginError);
              }
              return res.redirect("/main");
            })
          );
        }
      });
  })(req, res, next);
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
  req.session.destroy();
  res.status(StatusCodes.OK).redirect("/");
};
