const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;
const { StatusCodes } = require("http-status-codes");
const User = require("../schemas/user");
const userModel = require("../models/login");
const { profileSchema, checkNickname } = require("../models/userValidation");

exports.kakaoCallback = (req, res, next) => {
  passport.authenticate(
    "kakao",
    { failureRedirect: "/" },
    async (err, user) => {
      if (err) return next(err);

      const { kakaoId } = user;
      const userInfo = await User.findOne({ kakaoId });

      const token = userModel.createJWT(userInfo);
      res.status(StatusCodes.OK).json({ token });
    }
  )(req, res, next);
};
exports.kakaoCallbackLocal = async (req, res, next) => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_REST_API,
        callbackURL: "http://localhost:3000/users/kakao/local",
      },
      // 카카오에서는 인증 수 callbakcURL 에 적힌 주소로 accessToken, refreshToken, profile 보냄
      async (accessToken, refreshToken, profile, done) => {
        console.log(refreshToken);
        // console.log("kakao profile: ", profile);
        const newUser = {
          kakaoId: profile.id,
          // nickname: profile.username.replace(/(\s*)/g, ""),
          email: profile._json.kakao_account.email,
        };
        try {
          let user = await User.findOne({ kakaoId: profile.id });
          if (user) {
            done(null, user);
          } else {
            user = await User.create(newUser);
            done(null, user);
          }
        } catch (error) {
          console.log(error);
          done(error);
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });

  const { kakaoId } = user;
  const userInfo = await User.findOne({ kakaoId });

  const token = userModel.createJWT(userInfo);
  res.status(StatusCodes.OK).json({ token });
};

//회원 수정
exports.modProfile = async (req, res) => {
  const user = req.locals;
  //닉네임, 연령별, 전문분야 선택 필수 입력.
  const { nickname, ageGroup, specialty } = await profileSchema.validateAsync(
    req.body
  );
  //닉네임 저장
  const check = await checkNickname(user._id, nickname, ageGroup, specialty);

  if (check) {
    return res
      .status(StatusCodes.OK)
      .json({ message: "회원가입이 완료되었습니다." });
  } else {
    throw new Error("닉네임이 중복 됩니다.");
  }
};
