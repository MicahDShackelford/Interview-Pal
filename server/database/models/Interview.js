const mongoose = require('mongoose');

const InterviewSchema = new mongoose.Schema({
    uId: Number,
    interviews: {type: Array, default: []},
});

const Interview = mongoose.model('Interview', InterviewSchema);

module.exports = Interview;