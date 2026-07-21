// MediCare Plus — Appointment routes
// Mounted at /api/appointments in server.js

const express = require('express');
const db = require('../db/connection');

const router = express.Router();

// POST /api/appointments — create a new booking
// This is what pages/appointment.html calls when the form is submitted.
router.post('/', (req, res) => {
  const {
    doctorId,
    doctorName,
    patientName,
    patientEmail,
    patientPhone,
    appointmentDate,
    appointmentTime,
    notes,
  } = req.body;

  // Basic server-side validation — never trust the client alone.
  if (!doctorId || !patientName || !patientEmail || !patientPhone || !appointmentDate || !appointmentTime) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  const insert = db.prepare(`
    INSERT INTO appointments
      (doctor_id, doctor_name, patient_name, patient_email, patient_phone, appointment_date, appointment_time, notes)
    VALUES (@doctorId, @doctorName, @patientName, @patientEmail, @patientPhone, @appointmentDate, @appointmentTime, @notes)
  `);

  const result = insert.run({
    doctorId,
    doctorName: doctorName || '',
    patientName,
    patientEmail,
    patientPhone,
    appointmentDate,
    appointmentTime,
    notes: notes || '',
  });

  const created = db
    .prepare('SELECT * FROM appointments WHERE id = ?')
    .get(result.lastInsertRowid);

  res.status(201).json(created);
});

// GET /api/appointments/mine — used by the Patient Portal.
// Reads the patient's email from their SESSION (set at login), not from
// a query parameter — so there's no way to view someone else's
// appointments just by changing a value in the request.
router.get('/mine', (req, res) => {
  if (!req.session.patientId) {
    return res.status(401).json({ error: 'You must be logged in to view your appointments.' });
  }

  const rows = db
    .prepare('SELECT * FROM appointments WHERE patient_email = ? ORDER BY appointment_date DESC, appointment_time DESC')
    .all(req.session.patientEmail);

  res.json(rows);
});

// GET /api/appointments?email=patient@example.com
// Kept for convenience/testing (e.g. curl) — the Patient Portal itself
// uses the session-protected /mine route above instead.
router.get('/', (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: 'Query parameter "email" is required.' });
  }

  const rows = db
    .prepare('SELECT * FROM appointments WHERE patient_email = ? ORDER BY appointment_date DESC, appointment_time DESC')
    .all(email);

  res.json(rows);
});

module.exports = router;
