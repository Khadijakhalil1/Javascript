MediCare Plus — Healthcare & Clinic Website
=============================================
Be Global Internship — Task: Healthcare & Clinic Website
Intern: Khadija Khalil

PROJECT STATUS (updated daily)
-------------------------------
Day 1 (13th July): Home page + About Us page — DONE
Day 2 (14th July): Services page + Doctors Directory with real-time search — DONE
Day 3 (15th July): Doctor Profile page + Appointment Booking with database — pending
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

HOW TO RUN THE BACKEND (added once appointment booking + login are built)
-------------------------------
This section will be filled in once /backend is implemented (Day 3–4).
It will cover:
  - Which runtime is required (Node.js version) and how to install
    dependencies (npm install)
  - How to set up the local database (schema + seed data)
  - Environment variables needed (e.g. DB connection string, session secret)
  - The command to start the backend server, and which port the
    front-end expects it on

NOTES
-------------------------------
- All content is Lorem Ipsum placeholder text per the task brief.
- Color palette: Teal #00A896 (primary), Deep Navy #02323A (secondary),
  Soft Mint #C9F0EA (tertiary), White #FFFFFF (accent). Font: Inter.
- Doctor "photos" and section illustrations are custom-generated flat
  avatar/illustration graphics rather than real stock photography.
