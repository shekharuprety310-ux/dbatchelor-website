require('dotenv').config();
const express = require('express');
const path = require('path');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 3001;

// Security & performance middleware
app.use(compression());

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make year available to all templates
app.locals.year = new Date().getFullYear();

// Routes
const mainRoutes = require('./routes/main');
app.use('/', mainRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).render('404', { 
    title: '404 - Page Not Found',
    page: 'error'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).render('404', { 
    title: '500 - Server Error',
    page: 'error'
  });
});

// Start server with helpful error handling
const server = app.listen(PORT, () => {
  console.log('');
  console.log('🎵 ================================');
  console.log('🎵  D Batchelor Enterprises');
  console.log('🎵  Website running!');
  console.log(`🎵  http://localhost:${PORT}`);
  console.log('🎵 ================================');
  console.log('');
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n❌ Port ${PORT} is already in use.`);
    console.error(`   Try: PORT=3002 node server.js`);
    console.error(`   Or kill the process using port ${PORT}:`);
    console.error(`   lsof -ti:${PORT} | xargs kill -9\n`);
    process.exit(1);
  } else {
    throw err;
  }
});

module.exports = app;
