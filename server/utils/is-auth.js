const jwt = require('jsonwebtoken')


const jwtTokens = ({userid,username,name}) =>{
    
    const user = { userid, username, name };
    const accessToken =jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:"100m"});
    const refreshToken = jwt.sign(user,process.env.REFRESH_TOKEN_SECRET,{expiresIn:'100m'});
    return ({accessToken,refreshToken})

}

module.exports= jwtTokens;


