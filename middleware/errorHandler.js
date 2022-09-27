const { StatusCodes } = require("http-status-codes");
const logger = require("../config/logger");
exports.errorHandlerMiddleware = (err, req, res, next) => {
  //default 값
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    errMessage: err.message || "다시 시도해 주세요.",
  };
  try {
    //500일때
    if (!customError) {
      if (req.locals) {
        const user = req.locals;
        logger.error(
          `res : ${user.nickname}(${req.ip}), ${StatusCodes.INTERNAL_SERVER_ERROR} : ${err.name} - ${err.message}`
        );
      }

      //throw로 보내주는거.
      return res
        .status(customError.statusCode)
        .json({ errMessage: customError.msg });
    } else {
      //400 300 200
      if (req.locals) {
        const user = req.locals;
        //기록하는 거
        logger.error(
          `res : ${user.nickname}(${req.ip}), ${err.statusCode} : ${err.name} - ${err.message}`
        );
      }
      //throw 보내주는거.
      return res.status(err.statusCode).json({ errMessage: err.message });
    }
  } catch (error) {
    return res
      .status(customError.statusCode)
      .json({ errMessage: customError.errMessage });
  }
};
