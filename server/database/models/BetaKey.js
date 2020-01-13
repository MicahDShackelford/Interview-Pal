const mongoose = require('mongoose');

const BetaKeySchema = new mongoose.Schema({
  key: {type: String, unique: true},
  uses: Number,
  name: String
});

const BetaKey = mongoose.model('BetaKey', BetaKeySchema);

module.exports = BetaKey;