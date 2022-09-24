const { StatusCodes } = require("http-status-codes");
const CustomApiError = require("./customApiError");

class Conflict extends CustomApiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.Conflict;
  }
}
module.exports = Conflict;
