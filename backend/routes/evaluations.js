const router = require('express').Router();

let Evaluation = require('../models/evaluation.model');
let Member = require('../models/members.model');

router.route('/').get(async (req, res) => {
   try {
     const evaluation = await Evaluation.find();
     res.json(evaluation)

   } catch (err) {
    res.status(400).json('error')

   }
}).post ((req, res) => {
   try {
     const newEvaluation = new Evaluation({
       managementEmail: req.body.managementEmail,
       teamName: req.body.teamName,
       members: []

     });
     
     const members = req.body.members;
     
     members.forEach(async member => {
       const newMember = new Member(member);
       // Member.findOne({memberEmail: memberEmail.email}).then(function(result){
       //     return result !== null;
       // });
 
       newEvaluation.members.unshift({memberId: newMember._id});
     
       await newMember.save();
       await newEvaluation.save();
       
    });
     res.json(members);
     
   } catch(err) {
     res.status(400).json('Error: ' + err);
 
   }

});

router.route('/:id').put(async (req, res) => {
  try {
    const update = {
      title: req.body.title,
      members: req.body.members
      
    }

    const evaluation = await Evaluation.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json(evaluation);

  } catch(error) {
    res.status(400).json('Error: ' + err);

  }

}).delete(async (req, res) => {
  try {
    await Evaluation.findByIdAndDelete(req.params.id);
    res.json('Evaluation Deleted!');

  } catch (err) {
    res.status(400).json('Error: ' + err);

  }
});

// API for getting members in Evaluation
router.route('/:id/members').get(async (req, res) => {

  const evaluation = await Evaluation.findById(req.params.id);
  const evalutationMembers = evaluation.members;
  let memberList = [];

  evalutationMembers.forEach(async member => {
    memberList.push(member.memberId);
  })

  // List all members in evaluation
  const records = await Member.find({ '_id': { $in: memberList } });

  res.json(records);
});

module.exports = router;
