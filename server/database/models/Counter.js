const mongoose = require('mongoose');

const CounterSchema = new mongoose.Schema({
  model: {type: String, required: true},
  int: {type: Number, default: 0},
});

const Counter = mongoose.model('Counter', CounterSchema);

module.exports = Counter;