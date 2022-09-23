const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Admin = require("../schemas/admin");
const adminModel = require("../models/adminLogin");
//카카오 로그인
module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "adminEmail",
        passwordField: "password",
      },
      async (adminEmail, password, done) => {
        try {
          const admin = await Admin.findOne({ adminEmail });

          if (admin) {
            const result = await adminModel.comparePassword(
              password,
              admin.password
            );
            console.log(result);
            if (result) {
              done(null, admin);
            } else {
              done(null, false, { message: "비밀번호 불일치" });
            }
          } else {
            done(null, false, { message: "등록되지 않은 이메일입니다." });
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
