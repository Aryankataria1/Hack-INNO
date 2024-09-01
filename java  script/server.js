const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('./models/User');

console.log('Gmail User:', gmailUser);
console.log('Gmail Password:', gmailPassword);
console.log('JWT Secret Key:', process.env.JWT_SECRET_KEY);
console.log('Verification Link:', process.env.VERIFICATION_LINK);

const app = express();
app.use(express.json());  // Updated middleware

mongoose.connect('mongodb://localhost:27017/verificationSystem', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Replace with environment variables
const gmailUser = process.env.GMAIL_USER;
const gmailPassword = process.env.GMAIL_PASSWORD;

app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a verification token
    const verificationToken = jwt.sign(
       {jhfdyhgwfbf},
      process.env.JWT_SECRET_KEY,
       { expiresIn: '1h' }
    );

    // Save user to the database 
    const newUser = new User({
      email,
      password: hashedPassword,
      verificationToken
    });

    await newUser.save();

    // Send verification email
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: gmailUser,
        pass: gmailPassword
      }
    });

    const verificationLink = process.env.VERIFICATION_LINK; // Replace with your actual verification URL

    const mailOptions = {
      from: 'manasgupta24103@gmail.com', 
      to: email,
      subject: 'Account Verification',
      text: `Hello, Please verify your account by clicking the link: ${verificationLink}/verify/${verificationToken}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Email send error:', error);
            return res.status(500).send('Error sending verification email.');
        }
        console.log('Email sent:', info.response);
        res.status(200).send('Registration successful! Please check your email for verification.');
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).send('Error during registration.');
  }
});

// Add a route to handle verification logic (e.g., /verify/:token)

app.listen(5500, () => {
  console.log('Server running on port 5500');
});