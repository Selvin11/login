const express = require('express')
const User = require('../models/schema/user')
const router = express.Router()
const moment = require('moment')
const objectIdToTimestamp = require('objectid-to-timestamp')
const sha1 = require('sha1')
const createToken = require('../middlewares/createToken')
const checkToken = require('../middlewares/checkToken')

// 注册
const Register = (req, res) => {
  // 这里的userRegister为mongoose中的
  // Entity —— 由Model创建的实体，使用save方法保存数据
  let userRegister = new User({
    name: req.body.name,
    password: sha1(req.body.password), // 将密码加密
    token: createToken(this.name)
  })

  // 将 objectId 转换为 用户创建时间
  // objectId即为每一行数据中的_id
  // ObjectId 是一个12字节 BSON 类型数据，有以下格式：
  // 前4个字节表示时间戳
  // 接下来的3个字节是机器标识码
  // 紧接的两个字节由进程id组成（PID）
  // 最后三个字节是随机数。
  // 因此objectIdToTimestamp的作用即是将前4个字节的时间戳转化
  userRegister.create_time = moment(objectIdToTimestamp(userRegister._id))
    .format('YYYY-MM-DD HH:mm:ss');

  User.findOne({
      name: (userRegister.name).toLowerCase()
    })
    .then(user => {
      if (user) {
        res.json({
          success: false,
          message: '该账户已注册'
        })
      } else {
        userRegister.save((err, user) => {
          if (err) {
            res.json(err)
          } else {
            res.json(user)
          }
        })
      }
    })
    .catch(err => res.json(err))
}

// 登录
const Login = (req, res) => {
  let userLogin = new User({
    name: req.body.name,
    password: sha1(req.body.password),
    token: createToken(this.name)
  })
  User.findOne({
      name: userLogin.name
    })
    .then(user => {
      if (!user) {
        res.json({
          success: false,
          message: "账号不存在"
        })
      } else if (userLogin.password === user.password) {
        var name = req.body.name;
        res.json({
          success: true,
          message: "登录成功",
          name: name,
          token: createToken(name),
          // 账户创建日期
          time: moment(objectIdToTimestamp(user._id))
            .format('YYYY-MM-DD HH:mm:ss')
        })
      } else {
        res.json({
          success: false,
          message: "密码错误"
        })
      }
    })
    .catch(err => res.json(err))
}

// 所有用户打印
const GetToken = (req, res) => {
  
}



module.exports = (router) => {
  router.post('/register', Register),
    router.post('/login', Login),
    router.get('/',checkToken ,GetToken)
}