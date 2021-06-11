// process.env를 사용하기 위해
require("dotenv").config();

// jsonwebtoken module import
const { sign, verify } = require("jsonwebtoken");

module.exports = {
    // access 토큰 생성
    createAccessToken: (data) => {
        return sign(data, process.env.ACCESS_SECRET, { expiresIn: "60m" });
    },
    // refrech 토큰 생성
    // createRefreshToken: (data) => {
    //     return sign(data, process.env.REFRESH_SECRET, { expiresIn: "30d" });
    // },
    // access 토큰 전송 : 클라이언트는 state에 저장
    sendAccessToken: (res, accessToken) => {
        res.json({ data: { accessToken }, message: "ok" });
    },
    // refrech 토큰 전송 : 클라이언트는 쿠키에 저장
    // sendRefreshToken: (res, refreshToken) => {
    //     res.cookie("refreshToken", refreshToken, {
    //       httpOnly: true,
    //     });
    // },
    // access 토큰 재전송 (access 토큰 유효기간 만료시 재전송 ex: 로그인 연장)
    resendAccessToken: (res, accessToken, data) => {
        res.json({ data: { accessToken, userInfo: data }, message: "ok" });
    },

    // 토큰 인증 검증
    isAuthorized: (req) => {
        const authorization = req.headers["authorization"];
        // Headers: { Authorization: "bearer JWT_TOKEN" }
        if (!authorization) {
          console.log('헤더에 토큰이 없음')
          return null;
        }
        const token = authorization.split(" ")[1];
    
        try {
          return verify(token, process.env.ACCESS_SECRET);
        } catch (err) {
          console.log('토큰 인증실패')
          // 토큰 인증 실패시
          return null;
        }
    },

    checkRefeshToken: (refreshToken) => {
        try {
          return verify(refreshToken, process.env.REFRESH_SECRET);
        } catch (err) {
          // 토큰 인증 실패시
          return null;
        }
    },

}