const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  id: {type: Number, required: true},
  email: {type: String, unique: true, required: true, minlength: 3},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  username: {type: String, unique: true, required: true, minlength: 3},
  profilePicture: {type: String, default: "https://img.icons8.com/cotton/64/000000/name--v2.png"},
  password: {type: String, required: true, minlength: 5},
  // salt: {type: String, required: true},
  registerDate: {type: Date, default: Date.now},
});

const User = mongoose.model('User', UserSchema);

module.exports = User;