const { StatusCodes } = require("http-status-codes");
const logger = require("../config/logger");
exports.errorHandlerMiddleware = (err, req, res, next) => {
    const user = req.locals;
    if(!err.isBoom){
        logger.error(`res : ${user.nickname}(${req.ip}), ${StatusCodes.INTERNAL_SERVER_ERROR} : ${err.name} - ${err.message}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({errMessage: err.message});
    }
    else{
        logger.error(`res : ${user.nickname}(${req.ip}), ${err.output.statusCode} : ${err.name} - ${err.output.payload.message}`);
        return res.status(err.output.statusCode).json({errorMessage : err.output.payload.message});
    }
}