const passport = require("passport");
const local = require("./local");
const Admin = require("../schemas/admin");
const kakaoLocal = require("./kakaoLocal");
const User = require("../schemas/user");

module.exports.local = () => {
  passport.serializeUser((admin, done) => {
    console.log(admin);
    done(null, admin);
  });
  passport.deserializeUser((admin, done) => {
    Admin.findOne({ admin })
      .then((admin) => done(null, admin))
      .catch((err) => done(err));
  });
  local();
  kakaoLocal();
};
// module.exports.kakaoLocal = () => {
//   passport.serializeUser((user, done) => {
//     done(null, user.id);
//   });
//   passport.deserializeUser((id, done) => {
//     User.findById(id, (err, user) => done(err, user));
//   });

// };
