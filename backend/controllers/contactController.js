const Contact = require('../models/contact');
const nodemailer = require('nodemailer');

// Function to handle form submission
exports.submitContactForm = async (req, res) => {
  const { fullName, email, message } = req.body;

  try {
    // Create a new contact entry in the database
    const newContact = new Contact({
      fullName,
      email,
      message,
    });

    await newContact.save();

    // Send an email notification to the admin
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL, // Your email
        pass: process.env.EMAIL_PASSWORD, // Your email password (use environment variables for safety)
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.ADMIN_EMAIL, // Admin's email
      subject: 'New Contact Form Submission',
      text: `You have received a new message from ${fullName}.\n\nEmail: ${email}\nMessage: ${message}`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log('Error sending email:', err);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    res.status(200).json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving contact form data', error: error.message });
  }
};
