Wanderlust Trails — Website
==============================
Intern: Khadija Khalil
Agency: Be Global (Digital Marketing Agency)

STATUS (as of Day 1 — 2nd August 2026)
----------------------------------------
Front-end only so far. No database or back-end server exists yet —
those are scheduled for Day 3–4 per the project timeline. This README
will be updated with full run/setup instructions once the back-end
and database are in place.

WHAT'S BUILT SO FAR
----------------------------------------
- index.html            Home page (hero + search, featured packages,
                         popular destinations, testimonials, newsletter
                         signup form — currently client-side only)
- pages/packages.html   Tour Packages listing with real-time filters
                         (destination, duration, budget, tour type)
                         and sort (price asc/desc, rating)
- css/style.css         Shared design tokens, nav, footer, buttons,
                         cards, package-card component
- css/home.css          Home page specific styles
- css/packages.css      Listing page specific styles
- js/data.js            Sample tour package + destination + testimonial
                         data (stand-in for the database until the API
                         is built)
- js/main.js            Shared behavior (mobile nav toggle, footer year)
- js/home.js             Home page rendering + hero search + newsletter
- js/packages.js        Listing page filtering/sorting logic

HOW TO VIEW RIGHT NOW
----------------------------------------
No install needed yet — it's static HTML/CSS/JS.
1. Open index.html directly in a browser, OR
2. Serve the folder locally for cleanest relative-path behavior:
     npx serve .
   (or the VS Code "Live Server" extension)
3. Visit the local address it prints (e.g. http://localhost:3000)

FOLDER STRUCTURE
----------------------------------------
/css        stylesheets
/js         client-side scripts + sample data
/images     image asset notes (see images/README.txt)
/pages      all pages except the homepage
/backend    reserved for the Node.js/Express API + DB (not started yet)

COLOR PALETTE
----------------------------------------
Ocean Blue    #0077B6   buttons, links, navbar, highlights
Sunset Orange #F4A261   CTAs, badges, price tags, accents
Sandy Beige   #FAF3E0   page backgrounds, card backgrounds
Deep Navy     #03045E   headings, footer, dark sections
Leaf Green    #2D6A4F   tags, availability indicators

Fonts: Montserrat (headings), Lato (body) — loaded via Google Fonts.

WHAT'S NEXT (Day 2 per timeline)
----------------------------------------
- Package Detail page (gallery, itinerary, inclusions/exclusions,
  pricing tiers, availability calendar, reviews, Book Now)
- Destinations page (visual grid with hover effect, links into
  filtered listing)

Full setup instructions for running the back-end locally, setting up
the database, and installing dependencies will be added here once
that work begins (Day 3–4).
