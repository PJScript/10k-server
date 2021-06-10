const tokenFunctions = require('./tokenFunctions')
const { users } = require('../DataBase/models')


const signin = async (req,res) => {
    const {email, password} = req.body
    let userinfo = await users.findOne({where:{email:email, password:password}}) //회원인지 아닌지 확인
    
    if(!userinfo){  //회원이 아니라면
        res.status(200).send({message:'회원이 아닙니다'})
    }else{
        let data = email
        delete password
        delete req.body.password

        const accessToken = tokenFunctions.createAccessToken(data)
        const refreshToken = tokenFunctions.createRefreshToken(data)

        res.status(200).send({
            isLogin:true, 
            accessToken:accessToken, 
            refreshToken:refreshToken
        })
    }
    
    
    // 로그인 요청을 받으면 회원인지 확인한다
    // 회원이 아니라면 메세지를 하나 띄워준다. 회원이 아닙니다.

    // 회원인지 확인 후 회원이라면 accessToken, refreshToken을 발행한다.
    // 응답에 accessToken을 담아서 보내주고 reFreshToken도 함께 보내준다.
    
}

module.exports = signin