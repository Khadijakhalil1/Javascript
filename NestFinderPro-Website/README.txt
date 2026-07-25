NestFinder Pro — Real Estate Website
=============================================
Be Global Internship — Task: Real Estate Website Development
Intern: Khadija Khalil

PROJECT STATUS (updated daily)
-------------------------------
Day 1 (24th July): Home page + Property Listings page with real-time filters — DONE
Day 2 (25th July): Property Detail page with gallery + About Us page — pending
Day 3 (26th July): Agents Directory + Agent Profile page + User Login and Dashboard — pending
Day 4 (27th July): Contact Us page + full review, responsiveness check, final submission — pending

FOLDER STRUCTURE
-------------------------------
NestFinderPro-Website/
  index.html              -> Home page
  css/style.css           -> Global design tokens + shared components
  css/pages.css           -> Shared styles for inner pages (filters, listings grid)
  js/properties-data.js   -> Central property dataset (shared across pages)
  js/home.js              -> Home page logic (featured listings, hero search)
  js/listings.js          -> Property Listings filtering + sorting
  js/main.js              -> Shared behavior (mobile nav)
  images/                 -> All property illustrations, interiors, agent avatars
                              (custom-generated in-house — Unsplash/placehold.co/
                              Freepik were not reachable from the dev sandbox used
                              to build this project, so original illustrations
                              were created instead, matching the requested
                              premium real-estate style)
  pages/                  -> All inner pages (listings.html so far)
  backend/                -> Reserved for the Node.js/Express + database code
                              that will power enquiries, saved favourites, and
                              user login (added Day 3). Empty for now.

HOW TO VIEW THE SITE (current, static pages)
-------------------------------
No build step is required for the pages built so far. Just open
index.html in any browser, or serve the folder with any static
file server, e.g.:

    npx serve .

or, with Python:

    python3 -m http.server 8080

Then visit http://localhost:8080

HOW TO RUN THE BACKEND (added Day 3 — enquiries, favourites, login)
-------------------------------
This section will be filled in once /backend is implemented.

NOTES
-------------------------------
- All content is Lorem Ipsum placeholder text per the task brief.
- Color palette: Gold #C9A84C (primary), Charcoal #2C2C2C (secondary),
  Warm White #F8F5F0 (tertiary), Slate Grey #6B7280 (accent).
  Fonts: Playfair Display (headings), Inter (body).
- Property photos and interiors are custom-generated illustrations
  rather than real stock photography, for the same network-access
  reason noted above.
