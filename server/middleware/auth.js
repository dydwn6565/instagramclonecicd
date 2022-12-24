exports.postLogin = (req,res,next) =>{

    res.setHeader('Set-Cookie','loggedIn=true; Max-Age=10')
}
