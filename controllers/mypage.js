const { isAuthorized } = require('./tokenFunctions')
const { users, times, goals } = require('../DataBase/models');

const mypage = async (req, res) => {

    // res.status(200).json('hi')
    console.log('데이터')
    console.log(req.headers,"요청 토큰 및 값")
    // 토큰 해독 검증
    const data = isAuthorized(req)
    console.log('data:', data); // id

    // Times 데이터 조회
    const timesData = await times.findAll({where: {user_id: data.id}})

    // name 찾기
    const name = await users.findOne({where : {id : data.id}})

    // name : name.dataValues.name, email : name.dataValues.email, 
    // Times 데이터가 없는 경우
    if(!timesData) {
        // name 추가 필요?
        res.send({userinfo : data, name: name, goalsList : [] });
    }
    // TImes 데이터가 있는 경우
    // timesData(객체 배열)의 각 요소에 goalName을 추가
    // 데이터 전송 : name, email, goal, acc time, total time
    for(let i = 0; i < timesData.length; i++) {
        console.log(`타임즈 데이터 ${i}번:`, timesData[i].dataValues)
        const goalName = await goals.findOne({where : {id : timesData[i].dataValues.goal_id}})
        timesData[i].dataValues.goalName = goalName.name;
    }

    res.json({
            login:req.cookies.login,
            name : name.dataValues.name, 
            email : name.dataValues.email,
            // times 테이블에 goal name이 추가 된 데이터.
            timesData
        }
    );
}

module.exports = mypage