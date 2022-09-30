const passport = require("passport");
const local = require("./local");
const Admin = require("../schemas/admin");
const kakaoLogin = require("./kakaoLogin");

module.exports.local = () => {
  passport.serializeUser((admin, done) => {
    done(null, admin);
  });
  passport.deserializeUser((admin, done) => {
    Admin.findOne({ admin })
      .then((admin) => done(null, admin))
      .catch((err) => done(err));
  });
  local();
  kakaoLogin();
};
