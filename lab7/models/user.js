const mongoose = require('mongoose');

//schema
const UserSchema = new mongoose.Schema({
  id: {
    type: String,

  },
  email: {
    type: String,
    required : [true, 'Please enter email']
  },
  password: {
    type: String,
    minlength : [5, 'password should be greater than 5']
  },
  name: {
    type: String,
    minlength : 6,
    maxlength : 15
}
});

module.exports = mongoose.model('user', UserSchema,'user');
