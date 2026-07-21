// MediCare Plus — Doctor routes
// Mounted at /api/doctors in server.js

const express = require('express');
const db = require('../db/connection');

const router = express.Router();

// GET /api/doctors — list all doctors (from the database, seeded via db/seed.js)
router.get('/', (req, res) => {
  const rows = db.prepare('SELECT * FROM doctors ORDER BY name').all();
  res.json(rows);
});

module.exports = router;
