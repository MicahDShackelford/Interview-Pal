const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  sId: {type: String, required: true},
  userId: Number,
  expired: {type: Boolean, required: false}
});

const Session = mongoose.model('Session', SessionSchema);

module.exports = Session;