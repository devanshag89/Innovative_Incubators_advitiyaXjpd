const twilio = require('twilio');
const nodemailer = require('nodemailer');

const sendWhatsAppNotification = (message, phoneNumber) => {
  const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

  client.messages.create({
    from: 'whatsapp:+14155238886', // Twilio's WhatsApp sandbox number
    to: `whatsapp:${phoneNumber}`,
    body: message,
  })
  .then(message => console.log("WhatsApp message sent:", message.sid))
  .catch(error => console.error("Error sending WhatsApp message:", error));
};

const sendEmailNotification = (message, email) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Admin Notification',
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

const sendNotification = (message, phoneNumber, email) => {
  sendWhatsAppNotification(message, phoneNumber);
  sendEmailNotification(message, email);
};

module.exports = sendNotification;