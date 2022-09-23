const { StatusCodes } = require("http-status-codes");
const { reset } = require("nodemon");
const logger = require("../config/logger");
exports.errorHandlerMiddleware = (err, req, res, next) => {
    try{
        if(!err.isBoom){
            if(req.locals){
                logger.error(`res : ${user.nickname}(${req.ip}), ${StatusCodes.INTERNAL_SERVER_ERROR} : ${err.name} - ${err.message}`);
            }
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({errMessage: err.message});
        }
        else{
            if(req.locals){
                logger.error(`res : ${user.nickname}(${req.ip}), ${err.output.statusCode} : ${err.name} - ${err.output.payload.message}`);
            } 
            return res.status(err.output.statusCode).json({errorMessage : err.output.payload.message});
        }
    }
    catch(err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err});
    }

}