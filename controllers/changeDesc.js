const { isAuthorized } = require('./tokenFunctions')
const { users, times, goals } = require('../DataBase/models')

const changeDesc = async (req, res) => {
    // 클라이언트에 goalName 보내달라고 요청하기.
    const { description, goalName } = req.body

    const data = isAuthorized(req)
    console.log('토큰 해독 데이터:', data); // id, email
    const userId = data.id;

    const goalId = await goals.findOne({where: {name: goalName}});
    // console.log(goalId);
    await times.update({description : description}, { where : {user_id : userId, goal_id : goalId.dataValues.id}})

    res.json('변경 완료')
}

module.exports = changeDesc