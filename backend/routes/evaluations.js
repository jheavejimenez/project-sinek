const router = require('express').Router();
const nodemailer = require('nodemailer');

let Evaluation = require('../models/evaluation.model');
let Member = require('../models/members.model');

router.route('/').get(async (req, res) => {
  try {
    const evaluations = await Evaluation.find();
    res.json(evaluations)
  } catch (err) {
    res.status(400).json('error')

  }
}).post(async (req, res) => {
  const SURVEY_RESULTS_BASE_URL = process.env.SURVEY_RESULTS_BASE_URL;
  try {
    const newEvaluation = new Evaluation({
      managementEmail: req.body.managementEmail,
      managementName: req.body.managementName,
      teamName: req.body.teamName,
      members: req.body.members,
    });
    await newEvaluation.save();
    const members = newEvaluation.members;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.APP_USERNAME,
        pass: process.env.APP_PASSWORD,
      }
    });

    members.forEach(function (member) {
      console.log(member);
      console.log(member._id);
      const mailOptions = {
        from: 'Atmos Cloud Solutions',
        subject: 'Qsinek Evaluation Form',
        html: `<p>Hi <b>${member.name}</b>,</p>
               <br>
               <br>
               <p><b>${newEvaluation.teamName}</b> has invited you to evaluate your peers based on trust! Click below to view the evaluation form:</p>
               <br>
               <a href="${SURVEY_RESULTS_BASE_URL}/evaluation-survey/${member._id}">Evaluation Form link</a>
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
      mailOptions.to = member.email;

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    });
    res.json(newEvaluation);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

router.route('/:id').get(async (req, res) => {
  try {
    const evaluation = await Evaluation.findById(req.params.id);
    res.json(evaluation)
  } catch (err) {
    res.status(400).json('error')

  }
});

module.exports = router;
