// 监测 token 是否过期
const jwt = require('jsonwebtoken')
module.exports = function(req, res, next) {
  if (req.headers['authorization']) {
    let token = req.headers['authorization'].split(' ')[1]

    // 解构 token，生成一个对象 { name: xx, iat: xx, exp: xx }
    
    let decoded = jwt.decode(token)
    console.log(decoded)
    // 监测 token 是否过期
    if (token && decoded.exp <= Date.now() / 1000) {
      return res.json({
        code: 401,
        token: false,
        error: 'token过期，请重新登录'
      })
    }else{
      return res.json({
        token: true
      })
    }
  }
  
  next();
}