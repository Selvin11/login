// 创建 token
var jwt = require('jsonwebtoken')

module.exports = function(name) {
    const token = jwt.sign({
            name: name
        },
        'secret', {
            expiresIn: '10s' // 测试时长
        });

    return token;
}