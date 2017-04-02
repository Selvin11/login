//新建一个models目录放数据模型,mongoose的每个数据model需要一个schema生成,

//新建movie.js文件或者其他的数据模型,用来提供基础数据.

// 这里的mongo模型是为应用提供的

const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        index: true,
        unique: true
    },
    password: String,
    create_time: Date
})


const User = module.exports = mongoose.model('UserSession', userSchema)