const logger = require("../config/logger");
const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      const user = req.locals;
      logger.info(`req : ${user.nickname}(${req.ip}), method: ${req.method}, api: ${req.url}`);
      await fn(req, res, next);
      logger.info(`res : ${user.nickname}(${req.ip}), status: ${res.statusCode}(${res.statusMessage})`);
    } catch (error) {
      //passing the next middleware.
      next(error);
    }
  };
};

module.exports = asyncWrapper;
