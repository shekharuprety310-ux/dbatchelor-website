const nodemailer = require('nodemailer');

// Create transporter for sending emails
const createTransporter = () => {
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;
  const emailHost = process.env.EMAIL_HOST || 'smtp.sendgrid.net';
  const emailPort = process.env.EMAIL_PORT || 587;
  
  if (!emailUser || !emailPass) {
    console.log('⚠️ Email not configured');
    return null;
  }
  
  console.log('Creating email transporter with:', emailUser);
  console.log('SMTP Host:', emailHost);
  
  const transporter = nodemailer.createTransport({
    host: emailHost,
    port: parseInt(emailPort),
    secure: false, // true for 465, false for 587
    auth: {
      user: emailUser,
      pass: emailPass
    },
    connectionTimeout: 15000,
    timeout: 30000
  });
  
  transporter.verify((error, success) => {
    if (error) {
      console.log('❌ SMTP connection failed:', error.message);
    } else {
      console.log('✅ SMTP connection verified!');
    }
  });
  
  return transporter;
};

// Send notification email when contact form is submitted
const sendContactNotification = async (formData) => {
  console.log('Attempting to send contact email...');
  const transporter = createTransporter();
  if (!transporter) return;
  
  const emailTo = process.env.EMAIL_TO || process.env.EMAIL_USER;
  const recipients = emailTo.split(',').map(e => e.trim());
  
  console.log('Sending to:', recipients);
  
  const mailOptions = {
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to: recipients,
    subject: `📞 New Contact Form - ${formData.name}`,
    html: `<h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
      <p><strong>Service:</strong> ${formData.service}</p>
      <p><strong>Message:</strong> ${formData.message}</p>`
  };
  
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Contact form email sent!', info.messageId);
  } catch (error) {
    console.log('❌ Email sending failed:', error.message);
  }
};

// Send notification email when booking form is submitted
const sendBookingNotification = async (formData) => {
  console.log('Attempting to send booking email...');
  const transporter = createTransporter();
  if (!transporter) return;
  
  const emailTo = process.env.EMAIL_TO || process.env.EMAIL_USER;
  const recipients = emailTo.split(',').map(e => e.trim());
  
  console.log('Sending to:', recipients);
  
  const mailOptions = {
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to: recipients,
    subject: `🎉 New Booking Request - ${formData.name} - ${formData.eventType}`,
    html: `<h2>New Booking Request</h2>
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Phone:</strong> ${formData.phone}</p>
      <p><strong>Event Type:</strong> ${formData.eventType}</p>
      <p><strong>Event Date:</strong> ${formData.eventDate}</p>
      <p><strong>Venue:</strong> ${formData.venue}</p>
      <p><strong>Guests:</strong> ${formData.guests}</p>
      <p><strong>Service:</strong> ${formData.service}</p>
      <p><strong>Duration:</strong> ${formData.hours} hours</p>
      <p><strong>Notes:</strong> ${formData.notes || 'None'}</p>`
  };
  
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Booking email sent!', info.messageId);
  } catch (error) {
    console.log('❌ Booking email failed:', error.message);
  }
};

module.exports = { sendContactNotification, sendBookingNotification };