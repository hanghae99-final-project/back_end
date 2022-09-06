const { StatusCodes } = require("http-status-codes");
module.exports = {
  ensureAuth: function (req, res, next) {
    if (req.session.admin) {
      return next();
    } else {
      res.redirect("/");
    }
  },
  ensureGuest: function (req, res, next) {
    if (req.session.admin) {
      res.redirect("/main");
    } else {
      return next();
    }
  },
};
