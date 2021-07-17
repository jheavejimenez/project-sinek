const router = require('express').Router();
let Member = require('../models/members.model');

router.route('/').get((req, res) => {
    Member.find()
    .then(member => res.json(member))
    .catch(err => res.status(400).json('Error: ' + err));
});

// ADD
router.route('/add').post((req, res) => {
  const newMember = new Member(req.body);

  newMember.save()
  .then(() => res.json('Member added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

// DELETE
router.route('/delete/:id').delete((req, res) => {
    Member.findByIdAndDelete(req.params.id)
    .then(() => res.json('Evaluation deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// UPDATE
router.route('/update/:id').post((req, res) => {
    Member.findById(req.params.id)
    .then(member => {
        member.username = req.body.username;

        member.save()
        .then(() => res.json('Evaluation updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
