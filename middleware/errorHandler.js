const { StatusCodes } = require("http-status-codes");
exports.errorHandlerMiddleware = (err, req, res, next) => {
    if(!err.isBoom){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({errMessage: err.message});
    }
    else{
        return res.status(err.output.statusCode).json({errorMessage : err.output.payload.message});
    }
}