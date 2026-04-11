const nodemailer = require('nodemailer');

// Create transporter for sending emails
// For Gmail, you'll need an App Password (not your regular password)
// For other services, configure accordingly
const createTransporter = () => {
  // Check if email credentials are configured
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log('⚠️ Email not configured - Form submissions will only show in console');
    return null;
  }
  
  return nodemailer.createTransport({
    service: 'gmail', // or use 'smtp.mailtrap.io' for testing
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Send notification email when contact form is submitted
const sendContactNotification = async (formData) => {
  const transporter = createTransporter();
  if (!transporter) return;
  
  // Support multiple emails (comma separated)
  const emailTo = process.env.EMAIL_TO || process.env.EMAIL_USER;
  const recipients = emailTo.split(',').map(e => e.trim());
  
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
    await transporter.sendMail(mailOptions);
    console.log('✅ Contact form notification email sent');
  } catch (error) {
    console.log('❌ Email sending failed:', error.message);
  }
};

// Send notification email when booking form is submitted
const sendBookingNotification = async (formData) => {
  const transporter = createTransporter();
  if (!transporter) return;
  
  // Support multiple emails (comma separated)
  const emailTo = process.env.EMAIL_TO || process.env.EMAIL_USER;
  const recipients = emailTo.split(',').map(e => e.trim());
  
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
    await transporter.sendMail(mailOptions);
    console.log('✅ Booking notification email sent');
  } catch (error) {
    console.log('❌ Email sending failed:', error.message);
  }
};

module.exports = { sendContactNotification, sendBookingNotification };