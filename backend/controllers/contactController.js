const Contact = require('../models/contact');
const nodemailer = require('nodemailer');


exports.submitContactForm = async (req, res) => {
  const { fullName, email, message } = req.body;

  try {

    const newContact = new Contact({
      fullName,
      email,
      message,
    });

    await newContact.save();


    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.ADMIN_EMAIL,
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

exports.fetchContactMessages = async (req, res) => {
  try {
    const messages = await Contact.find();
    console.log(messages);
    res.status(200).json({ message: "messages fetched successfully", messages: messages });
  }
  catch (err) {
    res.status(500).json({ message: 'Error fetching contact messages', error: err.message })
  }
}
