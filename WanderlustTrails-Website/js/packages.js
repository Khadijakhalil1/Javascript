/* =========================================================
   Wanderlust Trails — Tour Packages listing logic
   Filters TOUR_PACKAGES (js/data.js) instantly in the browser
   as filter controls change — no page reload. Once /backend
   exists this can swap to fetch('/api/packages?...') while
   keeping the same render function.
   ========================================================= */

function starString(rating) {
  const full = Math.round(rating);
  return "\u2605".repeat(full) + "\u2606".repeat(5 - full);
}

const state = {
  destination: "",
  type: new Set(),
  duration: "",
  maxBudget: 2500,
  sort: "recommended"
};

function applyFilters() {
  let results = TOUR_PACKAGES.filter((p) => {
    if (state.destination && p.destination !== state.destination) return false;
    if (state.type.size > 0 && !state.type.has(p.type)) return false;
    if (state.duration) {
      const [min, max] = state.duration.split("-").map(Number);
      if (p.duration < min || (max && p.duration > max)) return false;
    }
    if (p.price > state.maxBudget) return false;
    return true;
  });

  switch (state.sort) {
    case "price-asc":
      results.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      results.sort((a, b) => b.price - a.price);
      break;
    case "rating-desc":
      results.sort((a, b) => b.rating - a.rating);
      break;
    default:
      results.sort((a, b) => Number(b.featured) - Number(a.featured));
  }

  render(results);
}

function render(results) {
  const grid = document.querySelector("#results-grid");
  const count = document.querySelector("#results-count");

  count.innerHTML = `Showing <strong>${results.length}</strong> of ${TOUR_PACKAGES.length} tours`;

  if (results.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <h3>No tours match those filters</h3>
        <p>Try widening your budget or clearing a filter.</p>
      </div>`;
    return;
  }

  grid.innerHTML = results
    .map((p) => {
      const availLabel = p.availability === "available" ? "Available" : p.availability === "limited" ? "Limited spots" : "Sold out";
      return `
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
          <span class="pkg-card-rating"><span class="stars">${starString(p.rating)}</span> ${p.rating.toFixed(1)} (${p.reviews})</span>
          <span>${p.duration} days</span>
        </div>
        <div style="font-size:0.82rem;color:var(--color-muted);">
          <span class="availability-dot availability-${p.availability}"></span>${availLabel}
        </div>
        <a class="btn btn-dark btn-block pkg-card-cta" href="package-detail.html?id=${p.id}">View Package</a>
      </div>
    </article>`;
    })
    .join("");
}

function populateDestinationOptions() {
  const select = document.querySelector("#filter-destination");
  const destinations = [...new Set(TOUR_PACKAGES.map((p) => p.destination))].sort();
  destinations.forEach((d) => {
    const opt = document.createElement("option");
    opt.value = d;
    opt.textContent = d;
    select.appendChild(opt);
  });
}

function wireControls() {
  const destSelect = document.querySelector("#filter-destination");
  const durationSelect = document.querySelector("#filter-duration");
  const budgetRange = document.querySelector("#filter-budget");
  const budgetValue = document.querySelector("#budget-value");
  const sortSelect = document.querySelector("#sort-select");
  const typeChecks = document.querySelectorAll(".filter-type");
  const clearBtn = document.querySelector("#clear-filters");

  destSelect.addEventListener("change", () => {
    state.destination = destSelect.value;
    applyFilters();
  });

  durationSelect.addEventListener("change", () => {
    state.duration = durationSelect.value;
    applyFilters();
  });

  budgetRange.addEventListener("input", () => {
    state.maxBudget = Number(budgetRange.value);
    budgetValue.textContent = `$${state.maxBudget}`;
    applyFilters();
  });

  sortSelect.addEventListener("change", () => {
    state.sort = sortSelect.value;
    applyFilters();
  });

  typeChecks.forEach((cb) => {
    cb.addEventListener("change", () => {
      if (cb.checked) state.type.add(cb.value);
      else state.type.delete(cb.value);
      applyFilters();
    });
  });

  clearBtn.addEventListener("click", () => {
    state.destination = "";
    state.duration = "";
    state.maxBudget = 2500;
    state.type.clear();
    state.sort = "recommended";

    destSelect.value = "";
    durationSelect.value = "";
    budgetRange.value = 2500;
    budgetValue.textContent = "$2500";
    sortSelect.value = "recommended";
    typeChecks.forEach((cb) => (cb.checked = false));

    applyFilters();
  });
}

function applyUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const destination = params.get("destination");
  if (destination) {
    state.destination = destination;
    const select = document.querySelector("#filter-destination");
    if ([...select.options].some((o) => o.value === destination)) {
      select.value = destination;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  populateDestinationOptions();
  applyUrlParams();
  wireControls();
  applyFilters();
});
