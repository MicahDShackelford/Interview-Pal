const mongoose = require('mongoose');

const NotesSchema = new mongoose.Schema({
  uId: Number,
  Notes: Array
});

const Notes = mongoose.model('Notes', NotesSchema);

module.exports = Notes;