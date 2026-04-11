const sgMail = require('@sendgrid/mail');

// Initialize SendGrid with API key
sgMail.setApiKey(process.env.EMAIL_PASS);

// Send notification email when contact form is submitted
const sendContactNotification = async (formData) => {
  console.log('Attempting to send contact email via SendGrid...');
  
  const apiKey = process.env.EMAIL_PASS;
  if (!apiKey) {
    console.log('❌ No SendGrid API key found');
    return;
  }
  
  const emailTo = process.env.EMAIL_TO || process.env.EMAIL_USER;
  const recipients = emailTo.split(',').map(e => e.trim());
  
  console.log('Sending to:', recipients);
  
  const msg = {
    to: recipients,
    from: process.env.EMAIL_FROM || 'info@batchelorenterprises.com',
    subject: `📞 New Contact Form - ${formData.name}`,
    html: `<h2 style="color: #5eb3ff;">New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
      <p><strong>Service:</strong> ${formData.service}</p>
      <p><strong>Message:</strong></p>
      <p>${formData.message}</p>
      <hr>
      <p style="color: #666; font-size: 12px;">Sent from D Batchelor Enterprises Website</p>`
  };
  
  try {
    await sgMail.send(msg);
    console.log('✅ Contact form email sent via SendGrid!');
  } catch (error) {
    console.log('❌ SendGrid error:', error.message);
    if (error.response) {
      console.log('Error details:', error.response.body);
    }
  }
};

// Send notification email when booking form is submitted
const sendBookingNotification = async (formData) => {
  console.log('Attempting to send booking email via SendGrid...');
  
  const apiKey = process.env.EMAIL_PASS;
  if (!apiKey) {
    console.log('❌ No SendGrid API key found');
    return;
  }
  
  const emailTo = process.env.EMAIL_TO || process.env.EMAIL_USER;
  const recipients = emailTo.split(',').map(e => e.trim());
  
  console.log('Sending to:', recipients);
  
  const msg = {
    to: recipients,
    from: process.env.EMAIL_FROM || 'info@batchelorenterprises.com',
    subject: `🎉 New Booking Request - ${formData.name} - ${formData.eventType}`,
    html: `<h2 style="color: #5eb3ff;">New Booking Request</h2>
      <h3>Client Details</h3>
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Phone:</strong> ${formData.phone}</p>
      <h3>Event Details</h3>
      <p><strong>Event Type:</strong> ${formData.eventType}</p>
      <p><strong>Event Date:</strong> ${formData.eventDate}</p>
      <p><strong>Start Time:</strong> ${formData.startTime || 'Not specified'}</p>
      <p><strong>Finish Time:</strong> ${formData.finishTime || 'Not specified'}</p>
      <p><strong>Venue:</strong> ${formData.venue}</p>
      <p><strong>Guests:</strong> ${formData.guests}</p>
      <p><strong>Services:</strong> ${Array.isArray(formData.services) ? formData.services.join(', ') : formData.services || 'Not specified'}</p>
      <p><strong>Notes:</strong> ${formData.notes || 'None'}</p>
      <hr>
      <p style="color: #666; font-size: 12px;">Sent from D Batchelor Enterprises Website</p>`
  };
  
  try {
    await sgMail.send(msg);
    console.log('✅ Booking email sent via SendGrid!');
  } catch (error) {
    console.log('❌ SendGrid error:', error.message);
    if (error.response) {
      console.log('Error details:', error.response.body);
    }
  }
};

module.exports = { sendContactNotification, sendBookingNotification };