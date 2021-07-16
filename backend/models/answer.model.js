const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const answerSchema = new Schema({
    questionOne: [{
      rank: {type: Number},
      memberId: {type: mongoose.Types.ObjectId, ref: 'Member'},
      memberName: {type: String},
      reason: {type: String}
    }],
    questionTwo: [{
      memberId: {type: mongoose.Types.ObjectId, ref: 'Member'},
      memberName: {type: String},
      reason: {type: String}
    }]
});
  
module.exports = mongoose.model('Answer', answerSchema);