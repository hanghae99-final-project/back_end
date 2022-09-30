const { StatusCodes } = require("http-status-codes");

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(StatusCodes.BAD_REQUEST).render("alert/successAlert", {
      message: "로그인이 필요합니다.",
      page: "",
    });
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(StatusCodes.BAD_REQUEST).render("alert/successAlert", {
      message: "이미 로그인한 상태입니다.",
      page: "main",
    });
  }
};
