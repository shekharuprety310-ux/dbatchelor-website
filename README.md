# D Batchelor Enterprises Website

Professional website for **D Batchelor Enterprises** — Tasmania's premier mobile DJ, audio hire, and event management company.

📱 **Facebook:** [facebook.com/Batchelorenterprisestasptyltd](https://www.facebook.com/Batchelorenterprisestasptyltd/)  
📞 **Phone:** 0467 764 778  
✉️ **Email:** cassandra@batchelorenterprises.com

---

## 🚀 Quick Start (Step by Step)

### Step 1 — Unzip the file
Double-click the zip file, or in terminal:
```bash
unzip dbatchelor-enterprises-website.zip
```

### Step 2 — Navigate INTO the folder
```bash
cd dbatchelor-website
```

### Step 3 — Install dependencies
```bash
npm install
```

### Step 4 — Start the development server
```bash
npm run dev
```
Or without nodemon:
```bash
npm start
```

### Step 5 — Open in your browser
```
http://localhost:3000
```

That's it! The site will be running. ✅

---

## 📁 Project Structure

```
dbatchelor-website/
├── server.js              # Main Express app entry point
├── package.json           # Dependencies
├── .env                   # Environment config (PORT etc)
│
├── routes/
│   └── main.js            # All page routes + contact form handler
│
├── views/
│   ├── partials/
│   │   ├── header.ejs     # Navbar, head tags, canvas setup
│   │   └── footer.ejs     # Footer, social links, scripts
│   ├── home.ejs           # Home — hero, services, stats, testimonials
│   ├── about.ejs          # About Us — story, values, coverage map
│   ├── services.ejs       # Services overview (all 5 services)
│   ├── dj-hire.ejs        # Mobile DJ Hire detail page
│   ├── party-hire.ejs     # Party Equipment Hire detail page
│   ├── our-work.ejs       # Portfolio with category filter
│   ├── events.ejs         # Events showcase & gallery
│   ├── contact.ejs        # Contact form + details
│   ├── booking.ejs        # Full event booking request form
│   ├── faq.ejs            # Accordion FAQ page
│   └── 404.ejs            # Custom 404 page
│
└── public/
    ├── css/
    │   ├── style.css          # Main dark DJ theme stylesheet
    │   └── animations.css     # Keyframes & scroll reveal animations
    ├── js/
    │   ├── main.js            # Nav, counters, particles, typewriter
    │   ├── animations.js      # Hover tilt, cursor trail
    │   └── audio-visualizer.js # Animated canvas waveform background
    └── images/
        ├── logo-circle.png
        ├── logo-map.png
        ├── logo-wave.png
        ├── logo-main.png
        ├── logo-stamp.png
        └── logo-location.png
```

---

## 📄 Pages & Routes

| URL | Page |
|---|---|
| `/` | Home |
| `/about` | About Us |
| `/services` | Services Overview |
| `/services/dj-hire` | Mobile DJ Hire |
| `/services/party-hire` | Party Equipment Hire |
| `/our-work` | Portfolio |
| `/events` | Events & Gallery |
| `/contact` | Contact Us |
| `/booking` | Book Now |
| `/faq` | FAQ |

---

## 🎨 Features

- **Animated canvas waveform** — real-time audio visualizer background
- **Typewriter hero** — cycles through service types
- **Scroll reveal animations** — elements animate in as you scroll
- **Counter animations** — stats count up when visible
- **Floating music notes** — decorative animated notes
- **3D card hover** — perspective tilt on service cards
- **Cursor trail** — subtle glow trail on desktop
- **Mobile responsive** — works on all screen sizes
- **Contact form** — with validation
- **Portfolio filter** — filter work by event type
- **FAQ accordion** — expandable questions

---

## 🔧 Customisation

### Change port (default 3000)
Edit `.env`:
```
PORT=3000
```

### Update business info
Edit `/views/partials/footer.ejs` for contact details and social links.

### Change colours
Edit CSS variables at the top of `/public/css/style.css`:
```css
:root {
  --primary: #0a7de8;
  --accent: #00d4ff;
  /* ... */
}
```

---

## 🌐 Deploying Live

### Recommended free/cheap hosts:
- **Railway.app** — drag and drop Node.js deploy
- **Render.com** — free tier available
- **DigitalOcean App Platform** — $5/mo

### With PM2 on a VPS:
```bash
npm install -g pm2
pm2 start server.js --name dbatchelor
pm2 save && pm2 startup
```

---

## 📞 Business Details

| | |
|---|---|
| **ABN** | 61 924 754 338 |
| **Phone** | 0467 764 778 |
| **Email** | cassandra@batchelorenterprises.com |
| **Address** | Unit 14, 1583 Nubeena Road, Nubeena TAS 7184 |
| **Postal** | PO Box 140, Nubeena TAS 7184 |
| **Coverage** | All of Tasmania |

Built with ❤️ for D Batchelor Enterprises
