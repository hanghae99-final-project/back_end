const { StatusCodes } = require("http-status-codes");
const CustomApiError = require("./customApiError");

class ConflictError extends CustomApiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.CONFLICT;
  }
}
module.exports = ConflictError;
