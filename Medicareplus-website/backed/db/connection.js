// MediCare Plus — Database connection
//
// This is the ONE place that talks to SQLite directly. Every route file
// imports `db` from here instead of opening its own connection.
//
// We use Node's BUILT-IN `node:sqlite` module (available in Node 22.5+).
// This means ZERO extra installs for the database itself — no native
// compiler, no build tools, nothing to go wrong. If `npm install` gives
// you trouble with a native package like better-sqlite3, this is why we
// avoided it.
//
// Requires Node.js 22.5 or later. Check your version with: node --version

const path = require('path');
const { DatabaseSync } = require('node:sqlite');

// The .db file lives next to this file. It is created automatically the
// first time the server runs — you do NOT need to install or run a
// separate database server (unlike MySQL/Postgres).
const dbPath = path.join(__dirname, 'database.db');
const db = new DatabaseSync(dbPath);

// ---------------------------------------------------------------
// Schema — runs every time the server starts. CREATE TABLE IF NOT EXISTS
// means this is safe to run repeatedly; it won't wipe existing data.
// ---------------------------------------------------------------
db.exec(`
  CREATE TABLE IF NOT EXISTS doctors (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    specialty TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS patients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    doctor_id TEXT NOT NULL,
    doctor_name TEXT NOT NULL,
    patient_name TEXT NOT NULL,
    patient_email TEXT NOT NULL,
    patient_phone TEXT NOT NULL,
    appointment_date TEXT NOT NULL,
    appointment_time TEXT NOT NULL,
    notes TEXT,
    status TEXT NOT NULL DEFAULT 'confirmed',
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (doctor_id) REFERENCES doctors (id)
  );
`);

module.exports = db;
