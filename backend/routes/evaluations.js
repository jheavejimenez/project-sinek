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
         user: process.env.APP_USERNAME,
         pass: process.env.APP_PASSWORD,
       }
     });

     const listOfEmail = req.body.members;

     let recipients = [req.body.managementEmail,];
     listOfEmail.forEach(i => {recipients.unshift(i.memberEmail)});

     recipients.forEach(function (to) {
       const mailOptions = {
         from: 'Sinek',
         subject: 'Hello World',
         html:`<p><b>${req.body.teamName}</b> has invited you to evaluate your peers based on trust! Click below to view the evaluation form:</p>
               <br>
               <p>Evaluation Form link (custom per team member)</p>
               <br>
               <p>If you have any questions or concerns, feel free to reply to this email, and we'll be happy to discuss it with you!</p>
               <br>
               <br>
               <p>
                  Regards,<br>
                  Clarke Benedict Plumo<br>
                  Chief Vision Officer<br>
                  Atmos Cloud Solutions, Inc.<br>
                  +639258032895
                </p>
               `

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
