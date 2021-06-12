const tokenFunctions = require('./tokenFunctions')
const { users ,times, goals} = require('../DataBase/models')




const withdrawal = async (req,res) => {
  let timesinfo = await times.findAll({})
  console.log(timesinfo.length)
  const verity = tokenFunctions.isAuthorized(req)  //토큰 해독
  
  if(!verity){ //토큰 해독불가능
    // 유효기간 지난 토큰. or 해독 안되는 잘못된 토큰
    res.status(404).send('잘못된 접근')
  }else{
    await users.findOne({where:{email:verity.email}})
    .then(res => {times.destroy({where:{user_id:res.id}})} )
      
    await users.destroy({where:{email:verity.email}})
    .then(() => {
      times.findAll({})})
    .then(res => {
      const set = `set @cnt=0`
      const update = `update users set users.id = @cnt:=@cnt+1;`
      const idReset = `ALTER TABLE users auto_increment=${res+1};`

      times.sequelize.query(set)
      times.sequelize.query(update)
      times.sequelize.query(idReset)
    })
    
    }
    res.status(200).send('회원탈퇴 되었습니다')
  }

  

module.exports = withdrawal

// 회원 탈퇴하면 user 뿐만 아니라 times 테이블도 지워야함