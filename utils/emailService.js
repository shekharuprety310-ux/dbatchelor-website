const nodemailer = require('nodemailer');

// Create transporter for sending emails
const createTransporter = () => {
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;
  
  // Check if email credentials are configured
  if (!emailUser || !emailPass) {
    console.log('⚠️ Email not configured - Form submissions will only show in console');
    console.log('EMAIL_USER:', emailUser ? 'SET' : 'NOT SET');
    console.log('EMAIL_PASS:', emailPass ? 'SET' : 'NOT SET');
    return null;
  }
  
  console.log('Creating email transporter with:', emailUser);
  
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: emailUser,
      pass: emailPass
    }
  });
  
  return transporter;
};

// Send notification email when contact form is submitted
const sendContactNotification = async (formData) => {
  console.log('Attempting to send contact email...');
  const transporter = createTransporter();
  if (!transporter) {
    console.log('No transporter - skipping email');
    return;
  }
  
  // Support multiple emails (comma separated)
  const emailTo = process.env.EMAIL_TO || process.env.EMAIL_USER;
  const recipients = emailTo.split(',').map(e => e.trim());
  
  console.log('Sending to:', recipients);
  
  const mailOptions = {
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to: recipients,
    subject: `📞 New Contact Form - ${formData.name}`,
    html: `
      <h2 style="color: #5eb3ff;">New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
      <p><strong>Service:</strong> ${formData.service}</p>
      <p><strong>Message:</strong></p>
      <p>${formData.message}</p>
      <hr>
      <p style="color: #666; font-size: 12px;">Sent from D Batchelor Enterprises Website</p>
    `
  };
  
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Contact form email sent! Message ID:', info.messageId);
  } catch (error) {
    console.log('❌ Email sending failed:', error.message);
    console.log('Error code:', error.code);
  }
};

// Send notification email when booking form is submitted
const sendBookingNotification = async (formData) => {
  console.log('Attempting to send booking email...');
  const transporter = createTransporter();
  if (!transporter) {
    console.log('No transporter - skipping email');
    return;
  }
  
  // Support multiple emails (comma separated)
  const emailTo = process.env.EMAIL_TO || process.env.EMAIL_USER;
  const recipients = emailTo.split(',').map(e => e.trim());
  
  console.log('Sending to:', recipients);
  
  const mailOptions = {
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to: recipients,
    subject: `🎉 New Booking Request - ${formData.name} - ${formData.eventType}`,
    html: `
      <h2 style="color: #5eb3ff;">New Booking Request</h2>
      <h3>Client Details</h3>
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Phone:</strong> ${formData.phone}</p>
      
      <h3>Event Details</h3>
      <p><strong>Event Type:</strong> ${formData.eventType}</p>
      <p><strong>Event Date:</strong> ${formData.eventDate}</p>
      <p><strong>Venue:</strong> ${formData.venue}</p>
      <p><strong>Number of Guests:</strong> ${formData.guests}</p>
      <p><strong>Service:</strong> ${formData.service}</p>
      <p><strong>Duration:</strong> ${formData.hours} hours</p>
      <p><strong>Notes:</strong> ${formData.notes || 'None'}</p>
      
      <hr>
      <p style="color: #666; font-size: 12px;">Sent from D Batchelor Enterprises Website</p>
    `
  };
  
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Booking email sent! Message ID:', info.messageId);
  } catch (error) {
    console.log('❌ Booking email failed:', error.message);
    console.log('Error code:', error.code);
  }
};

module.exports = { sendContactNotification, sendBookingNotification };