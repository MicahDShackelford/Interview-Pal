const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/interviewpal', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, 'useFindAndModify': false,});

const db = mongoose.connection;

db.on('error', () => {
  console.log("[Database] Error establishing handshake, Action required before service will work as intended.");
});
db.on('open', () => {
  console.log("[Database] Handshake established");
});

module.exports = db;