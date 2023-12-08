const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Enable CORS for all routes with specific options
app.use(cors({
  origin: '*', // or '*' to allow any origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // enable cookies and authentication headers
}))

app.post('/send-email', (req, res) => {
  const { recipient, subject, body } = req.body;

  // Replace the following with your email sending logic
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'shubhambabai8@gmail.com',
      pass: 'tnjxjxzykxsqrxbi',
    },
  });

  const mailOptions = {
    from: 'shubhambabai8@gmail.com',
    to: recipient,
    subject: subject,
    text: body,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Error sending email' });
    } else {
      console.log('Email sent:', info.response);
      res.json({ success: true });
    }
  });
});

app.get('', (req, res) => {
  res.send({"run": "yes"})
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
