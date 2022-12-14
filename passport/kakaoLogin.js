const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;
const User = require("../schemas/user");
//카카오 로그인
module.exports = () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_REST_API,
        callbackURL: process.env.KAKAO_REDIRECT_URI_LOCAL,
      },
      // 카카오에서는 인증 수 callbakcURL 에 적힌 주소로 accessToken, refreshToken, profile 보냄
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          kakaoId: profile.id,
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
};
