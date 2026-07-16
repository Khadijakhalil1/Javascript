MediCare Plus — Healthcare & Clinic Website
=============================================
Be Global Internship — Task: Healthcare & Clinic Website
Intern: Khadija Khalil

PROJECT STATUS (updated daily)
-------------------------------
Day 1 (13th July): Home page + About Us page — DONE
Day 2 (14th July): Services page + Doctors Directory with real-time search — DONE
Day 3 (15th July): Doctor Profile page + Appointment Booking with database — DONE
Day 4 (16th July): Patient Login Portal + Contact Us page — pending
Day 5 (17th July): Full review, responsiveness check, final submission — pending

FOLDER STRUCTURE
-------------------------------
MediCarePlus-Website/
  index.html            -> Home page
  css/style.css         -> Global design tokens + shared components
  css/pages.css         -> Shared styles for inner pages
  js/main.js            -> Shared front-end behavior
  images/               -> All illustrations, icons, and doctor avatars
                            (custom-generated in-house — Freepik/placehold.co
                            were not reachable from the dev sandbox used to
                            build this project, so original graphics were
                            created instead, matching the requested style)
  pages/                -> All inner pages (about.html so far)
  backend/               -> Reserved for the Node.js/Express + database code
                            that will power appointment booking and patient
                            login (added Day 3–4). Empty for now.

HOW TO VIEW THE SITE (current, static pages)
-------------------------------
No build step is required for the pages built so far. Just open
index.html in any browser, or serve the folder with any static
file server, e.g.:

    npx serve .

or, with Python:

    python3 -m http.server 8080

Then visit http://localhost:8080

HOW TO RUN THE BACKEND (appointment booking API)
-------------------------------
Requirements:
  - Node.js version 22.5 or later (the backend uses Node's built-in
    node:sqlite module, so NO separate database software needs to be
    installed — no MySQL server, no native compiler required).
    Check your version with: node --version

Setup (run once):
  1. Open a terminal in the /backend folder:
       cd MediCarePlus-Website/backend
  2. Install dependencies (just Express + cors):
       npm install
  3. Seed the doctors table (creates database.db if it doesn't exist yet,
     and adds the 8 doctors used across the site):
       npm run seed

Run the server:
       npm start
     (or: node server.js)

  You should see:
       MediCare Plus API listening on http://localhost:3000

  Leave this terminal running. Then open the site's front-end pages
  (e.g. via `npx serve .` from the project root, or just opening
  index.html directly) in a browser as normal — the Appointment
  Booking page (pages/appointment.html) will call this API
  automatically at http://localhost:3000/api/appointments.

  If the backend isn't running, the booking page shows a banner
  telling you to start it — your form entries are not lost.

API endpoints:
  GET  /api/health                     -> {status: "ok"}
  GET  /api/doctors                    -> list of seeded doctors
  POST /api/appointments               -> create a new appointment
  GET  /api/appointments?email=...     -> appointments for one patient
                                           (used by the Patient Portal, Day 4)

Database:
  - SQLite file: backend/db/database.db (created automatically, not
    included in this zip — it's generated the first time you run the
    seed script / server)
  - Schema lives in backend/db/connection.js (tables: doctors,
    appointments, patients — patients table is ready for Day 4's
    login feature)

NOTES
-------------------------------
- All content is Lorem Ipsum placeholder text per the task brief.
- Color palette: Teal #00A896 (primary), Deep Navy #02323A (secondary),
  Soft Mint #C9F0EA (tertiary), White #FFFFFF (accent). Font: Inter.
- Doctor "photos" and section illustrations are custom-generated flat
  avatar/illustration graphics rather than real stock photography.
