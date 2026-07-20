// MediCare Plus — Backend server
// Run with: node server.js   (or: npm start)
// Starts a local API on http://localhost:3000

const express = require('express');
const cors = require('cors');
const session = require('express-session');

// Importing this runs db/connection.js, which opens (or creates)
// database.db and makes sure all tables exist.
require('./db/connection');

const appointmentsRouter = require('./routes/appointments');
const doctorsRouter = require('./routes/doctors');
const authRouter = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Allow the front-end (served from a different port, e.g. localhost:8080
// via `npx serve` or Live Server) to call this API WITH cookies attached.
// `credentials: true` + reflecting the request origin (instead of "*")
// is required for session cookies to work cross-port in the browser.
app.use(cors({ origin: true, credentials: true }));

// Parses incoming JSON request bodies into req.body
app.use(express.json());

// Session handling — after a successful login, req.session.patientId is
// set; the browser gets a cookie that identifies this session on every
// later request, so /api/appointments/mine knows who's asking.
// NOTE: this uses the default in-memory session store, which is fine for
// local development/demo purposes (this task). It resets if the server
// restarts, and isn't meant for a real production deployment.
app.use(session({
  secret: 'medicareplus-dev-secret-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  },
}));

// Simple request log — helpful while developing
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'MediCare Plus API is running.' });
});

app.use('/api/appointments', appointmentsRouter);
app.use('/api/doctors', doctorsRouter);
app.use('/api/auth', authRouter);

app.listen(PORT, () => {
  console.log(`MediCare Plus API listening on http://localhost:${PORT}`);
  console.log(`Try it: http://localhost:${PORT}/api/health`);
});
