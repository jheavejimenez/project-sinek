const uuidv4 = require('uuid').v4;
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const evaluationSchema = new Schema({
  managementEmail: {type: String, required: true},
  managementName: {type: String, required: true},
  teamName: {type: String, required: true},
  members: [{
    name: {type: String, required: true},
    email: {type: String, required: true},
    answer: [{
      trusts: [{
        memberId: {type: String, required: true},
        rank: {type: Number, required: true},
        reason: {type: String},
      }],
      needsImprovement: {
        memberId: {type: String, required: true},
        reason: {type: String, required: true},
      },
      selfImprovement: {type: String, required: true},
    }],
  }],
}, {
  timestamps: true,
});

const Evaluation = mongoose.model('Evaluation', evaluationSchema);

module.exports = Evaluation;
