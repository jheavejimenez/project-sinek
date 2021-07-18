const router = require('express').Router();
const nodemailer = require('nodemailer');

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
       newEvaluation.members.unshift({memberId: newMember._id});
     
       await newMember.save();
       await newEvaluation.save();

     });

     const transporter = nodemailer.createTransport({
       host: "smtp.gmail.com",
       port: 587,
       secure: false,
       auth: {
         user: 'jimenezjheave123@gmail.com',
         pass: 'lpngvrsokqbcrttu',
       }
     });

     let recipients = ['oninja258@gmail.com'];

     recipients.forEach(function (to) {
       const mailOptions = {
         from: 'Sinek',
         subject: 'testing2',
         text: 'It works' 

       };
       mailOptions.to = to;
       
       transporter.sendMail(mailOptions, function(error, info){
         if (error) {
          console.log(error);
         } else {
           console.log('Email sent: ' + info.response);
         }
       });
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

module.exports = router;
