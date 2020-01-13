const mongoose = require('mongoose');

const CalendarSchema = new mongoose.Schema({
  uId: {type: Number, required: true},
  events: {type: Array, required: true, default: []}
});

const Calendar = mongoose.model('Calendar', CalendarSchema);

module.exports = Calendar;