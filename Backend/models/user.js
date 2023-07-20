const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true, unique : true },
  appointmentDate : {type: String},
  showTime: {type: String},
  status: {type: String},
  whatChanged: {type:String},
  languageStr: {type:String},
});

module.exports = mongoose.model('User', UserSchema);