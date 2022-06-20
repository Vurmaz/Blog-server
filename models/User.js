const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    username:{
      type:String,
      required:[true, ' Enter a username '],
    },
    email:{
        type: String,
        required:[true, ' Enter an e-mail '],
        match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        ' Please provide a valid email ',
        ],
        unique:[true, ' E-mail is taken ']
    },
    password: {
        type: String,
        required: [true, ' Enter a password '],
        minlength: [6, ' Password should be at least six characters '],
    },
    passwordConfirm: {
      type:String,
      required:[true, ' Retype your password '],
      validate:{
        validator:function(el) {
          return el === this.password
        }, message: ' Password do not match '
      }
    }
})
UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  this.passwordConfirm = undefined
})
UserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password)
  return isMatch
}

module.exports = mongoose.model('User', UserSchema)