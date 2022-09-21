const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      //passing the next middleware.
      next(error); //우선 에러핸들러 미들웨어를 안만들어서 주석처리
      //res.status(400).json({errMessage: error.message});
    }
  };
};

module.exports = asyncWrapper;
