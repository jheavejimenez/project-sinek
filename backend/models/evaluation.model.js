const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const evaluationSchema = new Schema({
    email: { type: String, required: true },
    teamName: {type: String, required: true},
    evaluationLink: {type: String},
    members: [{
      memberId: {type: mongoose.Types.ObjectId, ref: 'Member'}
    }]
}, {
    timesmaps: true,
});

const Evaluation = mongoose.model('Evaluation', evaluationSchema);

module.exports = Evaluation;