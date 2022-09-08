const { StatusCodes } = require("http-status-codes");
const Admin = require("../schemas/admin");
const jwt = require("jsonwebtoken");
module.exports = {
  ensureAuth: async function (req, res, next) {
    const cookies = req.cookies[process.env.COOKIE_NAME];
    try {
      if (cookies) {
        const [tokenType, tokenValue] = cookies.split(" ");
        if (tokenType !== "Bearer") {
          return res
            .status(StatusCodes.BAD_REQUEST)
            .render("alert/alert", { error: "토큰오류." });
        }
        if (jwt.TokenExpiredError()) {
          res.clearCookie(process.env.COOKIE_NAME);
        }
        const { userId } = jwt.verify(tokenValue, process.env.JWT_SECRET);
        const admin = await Admin.findOne({ adminEmail: userId });
        res.locals.user = admin;
        next();
      } else {
        res.redirect("/");
      }
    } catch (err) {
      res.clearCookie(process.env.COOKIE_NAME);
      return res.redirect("/");
    }
  },
  ensureGuest: function (req, res, next) {
    const cookies = req.cookies[process.env.COOKIE_NAME];
    if (cookies) {
      res.redirect("/main");
    } else {
      return next();
    }
  },
};
