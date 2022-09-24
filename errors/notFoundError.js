const { StatusCodes } = require("http-status-codes");
const CustomApiError = require("./customApiError");
//make error class for authentication
class notFoundError extends CustomApiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = notFoundError;
