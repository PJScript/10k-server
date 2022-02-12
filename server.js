const https = require('https');
const fs = require('fs');

const express = require('express');
const morgan = require("morgan");
const cors = require('cors');
const cookieParser = require('cookie-parser')
require("dotenv").config();

const signin = require('./controllers/signin')
const signup = require('./controllers/signup')
const signout = require('./controllers/signout')
const mypage = require('./controllers/mypage')
const changeDesc = require('./controllers/changeDesc')
const addGoal = require('./controllers/addGoal')
const removeGoal = require('./controllers/removeGoal')
const withdrawal = require('./controllers/withdrawal')
const goalsPage = require('./controllers/goalPage')
const saveTime = require('./controllers/saveTime')

const app = express();

app.use(express.json())
app.use(morgan("default"));
app.use(cookieParser());

// app.use(cors());
app.use(
    cors({
        // 클라이언트 도메인 입력
        origin: '*',
        credentials: true,
        method: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS']
    })
);

app.get('/', (req, res) => {
    res.send('test')
})
app.get('/user', mypage)
app.get('/signout', signout)

app.post('/signin', signin)
app.post('/signup', signup)
app.post('/goals', addGoal)
app.post('/mypage/goal', goalsPage)
app.post('/goals/time', saveTime)

app.put('/goals', changeDesc)

app.delete('/user', withdrawal)
app.delete('/goals', removeGoal)

// https 변경 필요
// const http = require('http');

function handleListen() {
	console.log("Listen on 4000 port")
}

const server = app.listen(4000, handleListen)
 
// const server = http.createServer(function (req, res) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.end('Hello World');
// }, app).listen(4000);

console.log('Server running at http://localhost:4000');

module.exports = server;