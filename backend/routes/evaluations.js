const router = require('express').Router();
const nodemailer = require('nodemailer');

let Evaluation = require('../models/evaluation.model');

const SURVEY_RESULTS_BASE_URL = process.env.SURVEY_RESULTS_BASE_URL;

const MANAGEMENT_EMAIL_TEMPLATE = (newEvaluation) => `
<p>Hi <b>${newEvaluation.managementName}</b>,</p>
<p>Thank you for using our platform! Click below to view the evaluation summary:</p>
<a href="${SURVEY_RESULTS_BASE_URL}/evaluation-summary/${newEvaluation._id}">Evaluation Form link</a>
<p>
This link will update every time a team member answers the evaluation form.
You will also be able to see the ones who have yet to answer the form.
</p>
<p>
If you have any questions or concerns, feel free to reply to this email,
and we'll be happy to discuss it with you!
</p>
<p>
  Regards,<br>
  Clarke Benedict Plumo<br>
  Chief Vision Officer<br>
  Atmos Cloud Solutions, Inc.<br>
  +639258032895
</p>
`

const TEAM_MEMBER_EMAIL_TEMPLATE = (newEvaluation, member) => `<p>Hi <b>${member.name}</b>,</p>
<p>
<b>${newEvaluation.teamName}</b>
has invited you to evaluate your peers based on trust! Click below to view the evaluation form:
</p>
<a href="${SURVEY_RESULTS_BASE_URL}/evaluation-survey/${member._id}">Evaluation Form link</a>
<p>
If you have any questions or concerns, feel free to reply to this email,
and we'll be happy to discuss it with you!
</p>
<p>
Regards,<br>
Clarke Benedict Plumo<br>
Chief Vision Officer<br>
Atmos Cloud Solutions, Inc.<br>
+639258032895
</p>
`

router.route('/').get(async (req, res) => {
  try {
    const evaluations = await Evaluation.find();
    res.json(evaluations)
  } catch (err) {
    res.status(400).json('error')

  }
}).post(async (req, res) => {
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

    const mailOptions = {
      from: 'Clarke Benedict Plumo',
      subject: `[Qsinek] ${newEvaluation.teamName} Evaluation Results`,
      html: MANAGEMENT_EMAIL_TEMPLATE(newEvaluation),
    };
    mailOptions.to = newEvaluation.managementEmail;

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    members.forEach(function (member) {
      const mailOptions = {
        from: 'Clarke Benedict Plumo',
        subject: `[Qsinek] ${newEvaluation.teamName} Evaluation Form`,
        html: TEAM_MEMBER_EMAIL_TEMPLATE(newEvaluation, member),
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
    if (!evaluation) {
      res.status(404).json({'error': "Evaluation not found"});
      return;
    }
    res.json(evaluation)
  } catch (err) {
    res.status(400).json('error')
  }
});

module.exports = router;
