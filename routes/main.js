const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const validator = require('validator');
const { sendContactNotification, sendBookingNotification } = require('../utils/emailService');

// Home
router.get('/', (req, res) => {
  res.render('home', {
    title: 'D Batchelor Enterprises | Professional DJ, Audio & Event Hire - Tasmania',
    page: 'home'
  });
});

// About
router.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Us | D Batchelor Enterprises',
    page: 'about'
  });
});

// Services
router.get('/services', (req, res) => {
  res.render('services', {
    title: 'Our Services | D Batchelor Enterprises',
    page: 'services'
  });
});

// DJ Hire
router.get('/services/dj-hire', (req, res) => {
  res.render('dj-hire', {
    title: 'Mobile DJ Hire | D Batchelor Enterprises',
    page: 'services'
  });
});

// Party Hire
router.get('/services/party-hire', (req, res) => {
  res.render('party-hire', {
    title: 'Party Equipment Hire | D Batchelor Enterprises',
    page: 'services'
  });
});

// Our Work
router.get('/our-work', (req, res) => {
  res.render('our-work', {
    title: 'Our Work | D Batchelor Enterprises',
    page: 'our-work'
  });
});

// Events
router.get('/events', (req, res) => {
  res.render('events', {
    title: 'Events & Gallery | D Batchelor Enterprises',
    page: 'events'
  });
});

// Contact
router.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'Contact Us | D Batchelor Enterprises',
    page: 'contact',
    success: null,
    errors: null,
    formData: {}
  });
});

// Contact form POST
router.post('/contact',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').trim().isEmail().withMessage('Valid email is required'),
    body('phone').optional().trim(),
    body('service').trim().notEmpty().withMessage('Please select a service'),
    body('message').trim().notEmpty().withMessage('Message is required'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('contact', {
        title: 'Contact Us | D Batchelor Enterprises',
        page: 'contact',
        success: null,
        errors: errors.array(),
        formData: req.body
      });
    }

    const { name, email, phone, service, message } = req.body;
    
    console.log('========== NEW CONTACT FORM SUBMISSION ==========');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Phone:', phone || 'Not provided');
    console.log('Service:', service);
    console.log('Message:', message);
    console.log('===================================================');
    
    // Send email notification (async - don't wait)
    try {
      await sendContactNotification({ name, email, phone, service, message });
    } catch (err) {
      console.log('Email error:', err.message);
    }

    res.render('contact', {
      title: 'Contact Us | D Batchelor Enterprises',
      page: 'contact',
      success: 'Thank you! We\'ll be in touch within 24 hours.',
      errors: null,
      formData: {}
    });
  }
);

// Booking
router.get('/booking', (req, res) => {
  res.render('booking', {
    title: 'Book Now | D Batchelor Enterprises',
    page: 'booking'
  });
});

// Booking form POST
router.post('/booking',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').trim().isEmail().withMessage('Valid email is required'),
    body('phone').trim().notEmpty().withMessage('Phone is required'),
    body('eventType').trim().notEmpty().withMessage('Event type is required'),
    body('eventDate').trim().notEmpty().withMessage('Event date is required'),
    body('venue').trim().notEmpty().withMessage('Venue/location is required'),
    body('guests').trim().notEmpty().withMessage('Number of guests is required'),
    body('service').trim().notEmpty().withMessage('Please select a service'),
    body('hours').trim().notEmpty().withMessage('Duration is required'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('booking', {
        title: 'Book Now | D Batchelor Enterprises',
        page: 'booking',
        success: null,
        errors: errors.array(),
        formData: req.body
      });
    }

    const { name, email, phone, eventType, eventDate, venue, guests, service, hours, notes } = req.body;
    
    console.log('========== NEW BOOKING REQUEST ==========');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Phone:', phone);
    console.log('Event Type:', eventType);
    console.log('Event Date:', eventDate);
    console.log('Venue:', venue);
    console.log('Guests:', guests);
    console.log('Service:', service);
    console.log('Duration:', hours, 'hours');
    console.log('Notes:', notes || 'None');
    console.log('==========================================');
    
    // Send email notification
    sendBookingNotification({ name, email, phone, eventType, eventDate, venue, guests, service, hours, notes });

    res.render('booking', {
      title: 'Book Now | D Batchelor Enterprises',
      page: 'booking',
      success: 'Thank you for your booking request! We\'ll contact you within 24 hours to confirm.',
      errors: null,
      formData: {}
    });
  }
);

// FAQ
router.get('/faq', (req, res) => {
  res.render('faq', {
    title: 'FAQ | D Batchelor Enterprises',
    page: 'faq'
  });
});

// Downloads
router.get('/downloads', (req, res) => {
  res.render('downloads', {
    title: 'Downloads | D Batchelor Enterprises',
    page: 'downloads'
  });
});

module.exports = router;
