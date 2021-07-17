const router = require('express').Router();

let Evaluation = require('../models/evaluation.model');
let Member = require('../models/members.model');


router.route('/').get((req, res) => {
    Evaluation.find()
    .then(evaluation => res.json(evaluation))
    .catch(err => res.status(400).json('Error: ' + err));
});

// ADD
router.route('/add').post(async (req, res) => {
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


  // const newEvaluation = new Evaluation(req.body);

  // newEvaluation.save()
  // .then(evaluation => {
  //   try {
  //     const members = req.body.members;
  
  //     members.forEach(async member => {
  //      const newMember = new Member(member);
  //      newEvaluation.members.unshift({memberId: newMember._id});
       
  //      await newMember.save();
  //      await newEvaluation.save();
  //     });    
  
  //     res.json(members);
  //   } catch(err) {
  //     res.status(400).json('Error: ' + err);
  //   }
  // })
  // .catch(err => res.status(400).json('Error: ' + err));
});

// READ Specific collection
router.route('/:id').get((req, res) => {
    Evaluation.findById(req.params.id)
    .then(evaluation => res.json(evaluation))
    .catch(err => res.status(400).json('Error: ' + err));
});

// DELETE
router.route('/:id').delete((req, res) => {
    Evaluation.findByIdAndDelete(req.params.id)
    .then(() => res.json('Evaluation deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// UPDATE
router.put('/update/:id', async(req, res) => {
  try {
    const update = {
      title: req.body.title,
      members: req.body.members
    }

    const evaluation = await Evaluation.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json(evaluation);
  }catch(error){
    res.status(400).json('Error: ' + err);
  }






    // Evaluation.findById(req.params.id)
    // .then(evaluation => {
    //   evaluation.title = req.body.title;
    //   evaluation.members = req.body.members;

    //   evaluation.save()
    //     .then(() => res.json('Evaluation updated!'))
    //     .catch(err => res.status(400).json('Error: ' + err));
    // })
    // .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
