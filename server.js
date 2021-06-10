const https = require('https');
const fs = require('fs');

const express = require('express');
const morgan = require("morgan");
const cors = require('cors');
require("dotenv").config();

const signin = require('./controllers/signin')
const signup = require('./controllers/signup')
const signout = require('./controllers/signout')
const mypage = require('./controllers/mypage')
const changeDesc = require('./controllers/changeDesc')
const addGoal = require('./controllers/addGoal')
const removeGoal = require('./controllers/removeGoal')
const withdrawal = require('./controllers/withdrawal')

const app = express();

app.use(express.json())
app.use(morgan);

// app.use(cors());
app.use(
    // cors 설정 보강 (JWT 할 때 확인)
    cors({
        // 클라이언트 도메인 입력
        origin: 'http://10k-bucket.s3-website.ap-northeast-2.amazonaws.com/',
        credentials: true,
        method: ['GET', 'POST']
        // JWT 토큰 인증 필요?
    })
);

// 라우팅 분기 체크
// 컨트롤러 함수 작성 후 연결
// : id필요한가? JWT 토큰 
app.get('/user/mypage', mypage)
app.post('/user/signin', signin)
app.post('/user/signup', signup)
app.post('/user/signout', signout)
app.post('/goal/add', addGoal)
app.post('/goal/remove', removeGoal)
app.put('/goal/change_desc', changeDesc)
app.delete('/user/delete', withdrawal)

// open ssl? 
// https 변경 필요
const http = require('http');

// http모듈의 createServer 함수를 호출하여 서버를 생성합니다.
// req: request. 웹 요청 매개변수, res: response. 웹 응답 매개변수
const server = http.createServer(function (req, res) {
    // writeHead: 응답 헤더를 작성합니다.
    // 200: 응답 성공, text/html: html문서
    res.writeHead(200, {'Content-Type': 'text/html'});
    // end: 응답 본문을 작성합니다.
    res.end('Hello World');
    // listen: 매개변수로 포트와 호스트를 지정합니다.
}).listen(4000);
console.log('Server running at http://localhost:4000');

module.exports = server;