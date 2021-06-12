const tokenFunctions = require('./tokenFunctions')
const { users ,times, goals} = require('../DataBase/models')




const withdrawal = async (req,res) => {
  let timesinfo = await times.findAll({})
  console.log(timesinfo.length)
  const verity = tokenFunctions.isAuthorized(req)  //토큰 해독
  
  if(!verity){ //토큰 해독불가능
    
    res.status(404).send('잘못된 접근')
  }else{
    await users.findOne({where:{email:verity.email}})
    .then(res => {times.destroy({where:{user_id:res.id}})} )// times에 있는 데이터 삭제 위에서 알아온 id 와 같은 것들만
      
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

// 회원 탈퇴시 times 테이블에 있는 정보도 삭제해야함
// if user_id 가 ? 인 것 모두 삭제 user_id 를 알아야함 