const rankService = require("../service/rank.service");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");

exports.getRank = async (req, res) => {
  const user = req.locals;
  const period = req.query.period; //day, week, month
  const category = req.query.category; // all, twenty, thirty
  let result = undefined;

  if (category === "all") {
    if (period !== "day" && period !== "week" && period !== "month") {
      throw new BadRequestError("설정된 period가 아닙니다.");
    }
    result = await rankService.getAllRank(user, period, false);
  } else if (category === "twenty" || category === "thirty") {
    if (period !== "day" && period !== "week" && period !== "month") {
      throw new BadRequestError("설정된 period가 아닙니다.");
    }
    result = await rankService.getAllRank(user, period, category);
  } else {
    throw new BadRequestError("설정된 category가 아닙니다.");
  }
  res.status(StatusCodes.OK).json(result);
};
