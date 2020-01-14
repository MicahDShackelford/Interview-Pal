const mongoose = require('mongoose');

const NotesSchema = new mongoose.Schema({
  uId: Number,
  notes: {type: Array, default: []}
});

const Notes = mongoose.model('Notes', NotesSchema);

module.exports = Notes;