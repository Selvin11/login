const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
      type: String,
      index: true,
      unique: true
    },
    password: String,
    token: String,
    create_time: Date
})


const User = module.exports = mongoose.model('UserToken', userSchema)
