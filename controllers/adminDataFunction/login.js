const Joi = require("joi");
const Admin = require("../../schemas/admin");

exports.main = (req, res) => {
  res.render("login");
};
exports.create = async (req, res) => {
  const adminSchema = Joi.object({
    EMAIL: Joi.string().email().required(),
    PASSWORD: Joi.string().min(5).max(12).alphanum().required(),
    CONFIRM: Joi.string().min(5).max(12).alphanum().required(),
  });

  // joi 객체의 스키마를 잘 통과했는지 확인
  const { EMAIL, PASSWORD, CONFIRM } = await adminSchema.validateAsync(
    req.body
  );
  if (!EMAIL) {
    return res.send({ msg: "이메일을 입력해주세요." });
  }
  if (PASSWORD !== CONFIRM) {
    return res.send({
      statusCode: 412,
      message: "입력하신 두개의 비밀번호가 다릅니다.",
    });
  }
};
exports.login = (req, res) => {
  res.send("Hello");
};
