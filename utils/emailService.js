const nodemailer = require('nodemailer');

// Send via SendGrid Web API (not SMTP - uses HTTPS port 443)
const sendViaSendGridAPI = async (formData, type = 'contact') => {
  const apiKey = process.env.EMAIL_PASS; // SendGrid API key
  const emailTo = process.env.EMAIL_TO || process.env.EMAIL_USER;
  const recipients = emailTo.split(',').map(e => e.trim());
  
  if (!apiKey) {
    console.log('❌ No SendGrid API key found');
    return;
  }
  
  console.log('Using SendGrid Web API...');
  console.log('API Key present:', apiKey.substring(0, 10) + '...');
  
  const subject = type === 'contact' 
    ? `📞 New Contact Form - ${formData.name}`
    : `🎉 New Booking Request - ${formData.name} - ${formData.eventType}`;
    
  const html = type === 'contact'
    ? `<h2 style="color: #5eb3ff;">New Contact Form Submission</h2>
       <p><strong>Name:</strong> ${formData.name}</p>
       <p><strong>Email:</strong> ${formData.email}</p>
       <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
       <p><strong>Service:</strong> ${formData.service}</p>
       <p><strong>Message:</strong> ${formData.message}</p>`
    : `<h2 style="color: #5eb3ff;">New Booking Request</h2>
       <p><strong>Name:</strong> ${formData.name}</p>
       <p><strong>Email:</strong> ${formData.email}</p>
       <p><strong>Phone:</strong> ${formData.phone}</p>
       <p><strong>Event Type:</strong> ${formData.eventType}</p>
       <p><strong>Event Date:</strong> ${formData.eventDate}</p>
       <p><strong>Venue:</strong> ${formData.venue}</p>
       <p><strong>Guests:</strong> ${formData.guests}</p>
       <p><strong>Service:</strong> ${formData.service}</p>
       <p><strong>Duration:</strong> ${formData.hours} hours</p>`;
  
  try {
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        personalizations: [{
          to: recipients.map(email => ({ email }))
        }],
        from: {
          email: process.env.EMAIL_FROM || 'info@batchelorenterprises.com',
          name: 'D Batchelor Enterprises'
        },
        subject: subject,
        content: [{
          type: 'text/html',
          value: html
        }]
      })
    });
    
    if (response.ok || response.status === 202) {
      console.log('✅ Email sent via SendGrid API!');
    } else {
      const errorData = await response.json();
      console.log('❌ SendGrid API error:', errorData);
    }
  } catch (error) {
    console.log('❌ SendGrid API failed:', error.message);
  }
};

// Send notification email when contact form is submitted
const sendContactNotification = async (formData) => {
  console.log('Attempting to send contact email...');
  await sendViaSendGridAPI(formData, 'contact');
};

// Send notification email when booking form is submitted
const sendBookingNotification = async (formData) => {
  console.log('Attempting to send booking email...');
  await sendViaSendGridAPI(formData, 'booking');
};

module.exports = { sendContactNotification, sendBookingNotification };