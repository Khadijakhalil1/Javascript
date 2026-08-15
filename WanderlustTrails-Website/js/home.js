/* =========================================================
   Wanderlust Trails — Home page rendering
   Populates featured packages, popular destinations, and
   testimonials from js/data.js, and wires up the hero search
   bar + newsletter signup form.
   ========================================================= */

function starString(rating) {
  const full = Math.round(rating);
  return "\u2605".repeat(full) + "\u2606".repeat(5 - full);
}

function renderFeatured() {
  const grid = document.querySelector("#featured-grid");
  if (!grid) return;

  const featured = TOUR_PACKAGES.filter((p) => p.featured).slice(0, 4);

  grid.innerHTML = featured
    .map(
      (p) => `
    <article class="pkg-card">
      <div class="pkg-card-media">
        <img src="${p.image}" alt="${p.name}" loading="lazy" />
        <span class="pkg-card-price">$${p.price}</span>
        <span class="pkg-card-type tag tag-accent">${p.type}</span>
      </div>
      <div class="pkg-card-body">
        <span class="pkg-card-dest">📍 ${p.destination}</span>
        <h3>${p.name}</h3>
        <p style="color:var(--color-muted);font-size:0.92rem;margin-bottom:0;">${p.summary}</p>
        <div class="pkg-card-meta">
          <span class="pkg-card-rating"><span class="stars">${starString(p.rating)}</span> ${p.rating.toFixed(1)}</span>
          <span>${p.duration} days</span>
        </div>
        <a class="btn btn-dark btn-block pkg-card-cta" href="pages/package-detail.html?id=${p.id}">View Package</a>
      </div>
    </article>`
    )
    .join("");
}

function renderDestinations() {
  const grid = document.querySelector("#destinations-grid");
  if (!grid) return;

  grid.innerHTML = POPULAR_DESTINATIONS.map(
    (d) => `
    <a class="dest-card" href="pages/packages.html?destination=${encodeURIComponent(d.name)}">
      <img src="${d.image}" alt="${d.name}" loading="lazy" />
      <div class="dest-card-label">
        <h3>${d.name}</h3>
        <span>Explore packages →</span>
      </div>
    </a>`
  ).join("");
}

function renderTestimonials() {
  const grid = document.querySelector("#testimonials-grid");
  if (!grid) return;

  grid.innerHTML = TESTIMONIALS.map(
    (t) => `
    <figure class="testimonial-card">
      <span class="stars">${starString(t.rating)}</span>
      <blockquote>"${t.quote}"</blockquote>
      <figcaption>
        <strong>${t.name}</strong>
        <span>${t.trip}</span>
      </figcaption>
    </figure>`
  ).join("");
}

function wireHeroSearch() {
  const form = document.querySelector("#hero-search");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const dest = form.querySelector("#hero-destination").value;
    const url = dest ? `pages/packages.html?destination=${encodeURIComponent(dest)}` : "pages/packages.html";
    window.location.href = url;
  });
}

function wireNewsletter() {
  const form = document.querySelector("#newsletter-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailInput = form.querySelector("input[type=email]");
    const status = form.querySelector(".newsletter-status");
    const email = emailInput.value.trim();

    if (!email) return;

    // NOTE: this currently only confirms client-side. Once /backend
    // is built (Day 4), this will POST to /api/newsletter to persist
    // the email in the newsletter_signups table.
    status.textContent = `Thanks! We'll send trip inspiration to ${email}.`;
    status.classList.add("visible");
    form.reset();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderFeatured();
  renderDestinations();
  renderTestimonials();
  wireHeroSearch();
  wireNewsletter();
});
