// MediCare Plus — Auth routes
// Mounted at /api/auth in server.js
//
// Session handling: express-session (configured in server.js) stores a
// signed cookie in the browser. On the server, req.session.patientId is
// set after a successful login/register, and cleared on logout. Every
// route that needs "the current patient" reads req.session.patientId —
// it is never trusted from the request body, so one patient can't read
// another patient's data by just changing an email in a form.

const express = require('express');
const db = require('../db/connection');
const { hashPassword, verifyPassword } = require('../auth/password');

const router = express.Router();

// POST /api/auth/register
router.post('/register', (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ error: 'Full name, email, and password are all required.' });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters.' });
  }

  const existing = db.prepare('SELECT id FROM patients WHERE email = ?').get(email);
  if (existing) {
    return res.status(409).json({ error: 'An account with that email already exists. Try logging in instead.' });
  }

  const passwordHash = hashPassword(password);
  const insert = db.prepare(`
    INSERT INTO patients (full_name, email, password_hash)
    VALUES (@fullName, @email, @passwordHash)
  `);
  const result = insert.run({ fullName, email, passwordHash });

  // Log the new patient in immediately (register -> straight into portal)
  req.session.patientId = result.lastInsertRowid;
  req.session.patientEmail = email;

  res.status(201).json({ id: result.lastInsertRowid, fullName, email });
});

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const patient = db.prepare('SELECT * FROM patients WHERE email = ?').get(email);
  if (!patient || !verifyPassword(password, patient.password_hash)) {
    // Same error for "no such user" and "wrong password" — don't reveal
    // which one it was, that's a minor account-enumeration protection.
    return res.status(401).json({ error: 'Incorrect email or password.' });
  }

  req.session.patientId = patient.id;
  req.session.patientEmail = patient.email;

  res.json({ id: patient.id, fullName: patient.full_name, email: patient.email });
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.json({ message: 'Logged out.' });
  });
});

// GET /api/auth/me — used on page load to check "am I logged in?"
router.get('/me', (req, res) => {
  if (!req.session.patientId) {
    return res.status(401).json({ error: 'Not logged in.' });
  }
  const patient = db.prepare('SELECT id, full_name, email FROM patients WHERE id = ?').get(req.session.patientId);
  if (!patient) {
    return res.status(401).json({ error: 'Not logged in.' });
  }
  res.json({ id: patient.id, fullName: patient.full_name, email: patient.email });
});

module.exports = router;
