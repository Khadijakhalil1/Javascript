// MediCare Plus — Seed the doctors table
// Run with: npm run seed
// Safe to re-run — uses INSERT OR REPLACE so it won't create duplicates.

const db = require('./connection');

const doctors = [
  { id: 'faizan', name: 'Dr. Faizan Ali', specialty: 'Neurologist' },
  { id: 'sultan', name: 'Dr. Sultan Raza', specialty: 'Orthopedic Surgeon' },
  { id: 'ayesha', name: 'Dr. Ayesha Rafiq', specialty: 'Pediatrician' },
  { id: 'abdullah', name: 'Dr. Abdullah Farooq', specialty: 'General Physician' },
  { id: 'najma', name: 'Dr. Najma Ahmed', specialty: 'Cardiologist' },
  { id: 'malika', name: 'Dr. Malika Siddiqui', specialty: 'Dermatologist' },
  { id: 'wahab', name: 'Dr. Wahab Chaudhry', specialty: 'Dentist' },
  { id: 'khalil', name: 'Dr. Khalil Rehman', specialty: 'ENT Specialist' },
  { id: 'forqan', name: 'Dr. Forqan Malik', specialty: 'General Physician' },
];

const insert = db.prepare(`
  INSERT OR REPLACE INTO doctors (id, name, specialty)
  VALUES (@id, @name, @specialty)
`);

for (const doctor of doctors) {
  insert.run(doctor);
}

console.log(`Seeded ${doctors.length} doctors into database.db`);
