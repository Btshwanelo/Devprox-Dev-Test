const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'must provide name'],
    maxlength: [25, 'name can not be more than 25 characters'],
  },
  surname: {
    type: String,
    required: [true, 'must provide surname'],
    maxlength: [25, 'name can not be more than 25 characters'],
  },
  idNo: {
    type: Number,
    required: [true, 'must provide id number'],
    maxlength: 13,
    trim: true
  },
  dateOfBirth: {
    type: String,
    required: [true, 'must provide date of birth'],
  },

})

module.exports = mongoose.model('User', UserSchema)
