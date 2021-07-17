const router = require('express').Router();
const Members = require('../models/members.model');
let Member = require('../models/members.model');

router.route('/').get(async (req, res) => {
    try {
        const members = await Members.find();
        res.json(members)

    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
   
}).post ((req, res) => {
    const newMember = new Member(req.body);

    newMember.save()
    .then(() => res.json('Member added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').put(async (req, res) =>{
    Member.findById(req.params.id)

    .then(member => {
        member.username = req.body.username;

        member.save()
        .then(() => res.json('Member updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));

}).delete(async (req, res) => {
    try {
        await Member.findByIdAndDelete(req.params.id);
        res.json('Member Deleted!');

    } catch(err) {
        res.status(400).json('Error: ' + err);
    }
});

module.exports = router;
