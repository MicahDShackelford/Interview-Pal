const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  id: {type: Number, required: true},
  level: {type: String, default: 'Beginner', required: true},
  status: {type: String, default: "Just joined InterviewPal!"},
  connections: {type: Array, default: [], required: true},
  employStatus: {type: String, default: "-"},
  bio: {type: String, default: "This profile doesnt have a bio"},
  displayEmail: {type: Boolean, default: false, required: true},
  displayPhone: {type: Boolean, default: false, required: true}
});

const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;