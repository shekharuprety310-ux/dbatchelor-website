const nodemailer = require('nodemailer');

// Try Gmail SMTP first (works in some cases)
const createTransporter = () => {
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;
  const emailApiKey = process.env.EMAIL_API_KEY;
  
  // If using Resend API
  if (emailApiKey) {
    console.log('Using Resend API for emails');
    return null; // Will use Resend directly
  }
  
  if (!emailUser || !emailPass) {
    console.log('⚠️ Email not configured');
    return null;
  }
  
  console.log('Creating email transporter with:', emailUser);
  
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
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

// Send via Resend API (fallback to console if not configured)
const sendViaResend = async (formData, type = 'contact') => {
  const apiKey = process.env.EMAIL_API_KEY;
  const emailTo = process.env.EMAIL_TO || process.env.EMAIL_USER;
  const recipients = emailTo.split(',').map(e => e.trim());
  
  if (!apiKey) {
    console.log('⚠️ No Resend API key - email not sent');
    return;
  }
  
  const subject = type === 'contact' 
    ? `📞 New Contact Form - ${formData.name}`
    : `🎉 New Booking Request - ${formData.name} - ${formData.eventType}`;
    
  const html = type === 'contact'
    ? `<h2>New Contact Form Submission</h2>
       <p><strong>Name:</strong> ${formData.name}</p>
       <p><strong>Email:</strong> ${formData.email}</p>
       <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
       <p><strong>Service:</strong> ${formData.service}</p>
       <p><strong>Message:</strong> ${formData.message}</p>`
    : `<h2>New Booking Request</h2>
       <p><strong>Name:</strong> ${formData.name}</p>
       <p><strong>Email:</strong> ${formData.email}</p>
       <p><strong>Phone:</strong> ${formData.phone}</p>
       <p><strong>Event Type:</strong> ${formData.eventType}</p>
       <p><strong>Event Date:</strong> ${formData.eventDate}</p>
       <p><strong>Venue:</strong> ${formData.venue}</p>`;
  
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        from: 'D Batchelor Website <onboarding@resend.dev>',
        to: recipients,
        subject: subject,
        html: html
      })
    });
    
    const data = await response.json();
    if (response.ok) {
      console.log('✅ Email sent via Resend!', data.id);
    } else {
      console.log('❌ Resend failed:', data);
    }
  } catch (error) {
    console.log('❌ Resend error:', error.message);
  }
};

// Send notification email when contact form is submitted
const sendContactNotification = async (formData) => {
  console.log('Attempting to send contact email...');
  
  // Check for Resend API key FIRST
  const apiKey = process.env.EMAIL_API_KEY;
  console.log('Resend API Key:', apiKey ? 'SET (length: ' + apiKey.length + ')' : 'NOT SET');
  
  if (apiKey) {
    console.log('Trying Resend API...');
    await sendViaResend(formData, 'contact');
    return;
  }
  
  // Fallback to SMTP - will likely fail on Railway
  console.log('No API key - falling back to SMTP (will probably fail on Railway)');
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
  
  // Check for Resend API key FIRST
  const apiKey = process.env.EMAIL_API_KEY;
  
  if (apiKey) {
    console.log('Trying Resend API for booking...');
    await sendViaResend(formData, 'booking');
    return;
  }
  
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