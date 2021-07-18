const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const membersSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    evaluationForm: [{
        evaluationId: {type: mongoose.Types.ObjectId, ref: 'Evaluation'},
        answerId: {type: mongoose.Types.ObjectId, ref: 'Answer'},
        answered: {type: Boolean}
    }]
}, {
    timesmaps: true,
});

const Members = mongoose.model('Members', membersSchema);

module.exports = Members;
