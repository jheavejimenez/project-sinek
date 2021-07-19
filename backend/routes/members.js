const router = require('express').Router();
const Members = require('../models/members.model');
let Member = require('../models/members.model');
let Evaluation = require('../models/evaluation.model');

router.route('/').get(async (req, res) => {
  try {
    const members = await Members.find();
    res.json(members)

  } catch (err) {
    res.status(400).json('Error: ' + err);
  }

}).post((req, res) => {
  const newMember = new Member(req.body);

  newMember.save()
    .then(() => res.json('Member added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id/evaluation').get(async (req, res) => {
  try {
    const memberId = req.params.id;
    const evaluation = await Evaluation.findOne({"members._id": memberId})
    const member = evaluation.members.filter(member => member._id.equals(memberId))[0];
    if (member.answer.length) {
      res.status(404).json({"error": "User has already filled out the form."});
      return;
    }
    evaluation._id = null;
    evaluation.members = evaluation.members.filter(member => !member._id.equals(memberId));
    evaluation.members.forEach(member => {
      member.answer = [];
      member.email = null;
    });
    res.json(evaluation);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

router.route('/:id/answers').post(async (req, res) => {
  try {
    const memberId = req.params.id;
    const evaluation = await Evaluation.findOne({"members._id": memberId})
    const member = evaluation.members.filter(member => member._id.equals(memberId))[0];
    member.answer = [req.body];
    await evaluation.save();
    res.json(member.answer);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

router.route('/:id').put(async (req, res) => {
  try {
    const {memberName, memberEmail, evaluationForm} = req.body;
    const update = {memberName, memberEmail, evaluationForm};
    const members = await Members.findByIdAndUpdate(req.params.id, update, {new: true});
    res.json(members);

  } catch (err) {
    res.status(400).json('Error: ' + err);

  }

}).delete(async (req, res) => {
  try {
    await Member.findByIdAndDelete(req.params.id);
    res.json('Member Deleted!');

  } catch (err) {
    res.status(400).json('Error: ' + err);

  }
});

module.exports = router;
