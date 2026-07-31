// NestFinder Pro — Property Listings page: real-time filters + sort

function formatPriceListing(property) {
  const amount = property.price.toLocaleString('en-US');
  return property.purpose === 'rent' ? `$${amount}<span>/month</span>` : `$${amount}`;
}

function listingCardHTML(p) {
  const tagClass = p.purpose === 'rent' ? 'property-tag for-rent' : 'property-tag';
  return `
    <div class="property-card">
      <a href="property-detail.html?id=${p.id}">
        <div class="property-thumb">
          <span class="${tagClass}">${p.tag}</span>
          <span class="property-wish">♡</span>
          <img src="${p.image}" alt="${p.title}">
        </div>
        <div class="property-info">
          <div class="property-price">${formatPriceListing(p)}</div>
          <h3>${p.title}</h3>
          <div class="property-location">📍 ${p.location}</div>
          <div class="property-meta">
            ${p.bedrooms ? `<span>🛏 ${p.bedrooms} Beds</span>` : `<span>🏢 Commercial</span>`}
            <span>🛁 ${p.bathrooms} Baths</span>
            <span>📐 ${p.area.toLocaleString()} sqft</span>
          </div>
        </div>
      </a>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('listingsGrid');
  const searchInput = document.getElementById('searchInput');
  const purposeFilters = document.getElementById('purposeFilters');
  const typeFilters = document.getElementById('typeFilters');
  const priceRange = document.getElementById('priceRange');
  const priceValue = document.getElementById('priceValue');
  const bedroomFilters = document.getElementById('bedroomFilters');
  const sortSelect = document.getElementById('sortSelect');
  const resultCount = document.getElementById('resultCount');
  const emptyState = document.getElementById('emptyState');
  const resetBtn = document.getElementById('resetFilters');

  let selectedBedrooms = 0;

  // --- Pre-fill filters from URL query params (from hero search / category links) ---
  const params = new URLSearchParams(window.location.search);
  if (params.get('location')) searchInput.value = params.get('location');
  if (params.get('type')) {
    const box = typeFilters.querySelector(`input[value="${params.get('type')}"]`);
    if (box) box.checked = true;
  }
  if (params.get('purpose')) {
    const allBox = purposeFilters.querySelector('input[value="all"]');
    const box = purposeFilters.querySelector(`input[value="${params.get('purpose')}"]`);
    if (box) { allBox.checked = false; box.checked = true; }
  }
  if (params.get('maxPrice')) {
    priceRange.value = params.get('maxPrice');
  }

  function updatePriceLabel() {
    const val = parseInt(priceRange.value, 10);
    priceValue.textContent = val >= 500000 ? '$500,000+' : `$${val.toLocaleString()}`;
  }
  updatePriceLabel();

  // --- Purpose: "All" clears the others; picking a specific one unchecks "All" ---
  purposeFilters.addEventListener('change', (e) => {
    const boxes = Array.from(purposeFilters.querySelectorAll('input[type="checkbox"]'));
    const allBox = boxes.find((b) => b.value === 'all');
    if (e.target === allBox && allBox.checked) {
      boxes.forEach((b) => { if (b !== allBox) b.checked = false; });
    } else if (e.target !== allBox && e.target.checked) {
      allBox.checked = false;
    } else if (e.target !== allBox && boxes.every((b) => !b.checked)) {
      allBox.checked = true;
    }
    applyFilters();
  });

  typeFilters.addEventListener('change', applyFilters);
  priceRange.addEventListener('input', () => { updatePriceLabel(); applyFilters(); });
  searchInput.addEventListener('input', applyFilters);
  sortSelect.addEventListener('change', applyFilters);

  bedroomFilters.querySelectorAll('.pill').forEach((pill) => {
    pill.addEventListener('click', () => {
      bedroomFilters.querySelectorAll('.pill').forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
      selectedBedrooms = parseInt(pill.dataset.value, 10);
      applyFilters();
    });
  });

  resetBtn.addEventListener('click', () => {
    searchInput.value = '';
    priceRange.value = 500000;
    updatePriceLabel();
    sortSelect.value = 'featured';
    selectedBedrooms = 0;
    bedroomFilters.querySelectorAll('.pill').forEach((p) => p.classList.remove('active'));
    bedroomFilters.querySelector('.pill[data-value="0"]').classList.add('active');
    const boxes = Array.from(purposeFilters.querySelectorAll('input[type="checkbox"]'));
    boxes.forEach((b) => (b.checked = b.value === 'all'));
    typeFilters.querySelectorAll('input[type="checkbox"]').forEach((b) => (b.checked = false));
    applyFilters();
  });

  function getCheckedValues(container) {
    return Array.from(container.querySelectorAll('input[type="checkbox"]:checked'))
      .map((b) => b.value)
      .filter((v) => v !== 'all');
  }

  function applyFilters() {
    const term = searchInput.value.trim().toLowerCase();
    const maxPrice = parseInt(priceRange.value, 10);
    const purposes = getCheckedValues(purposeFilters);
    const types = getCheckedValues(typeFilters);

    let visible = PROPERTIES.filter((p) => {
      const matchesSearch = !term || p.title.toLowerCase().includes(term) || p.location.toLowerCase().includes(term);
      const matchesPurpose = purposes.length === 0 || purposes.includes(p.purpose);
      const matchesType = types.length === 0 || types.includes(p.type);
      const matchesPrice = p.price <= maxPrice;
      const matchesBedrooms = selectedBedrooms === 0 || p.bedrooms >= selectedBedrooms;
      return matchesSearch && matchesPurpose && matchesType && matchesPrice && matchesBedrooms;
    });

    const sortVal = sortSelect.value;
    if (sortVal === 'price-asc') visible.sort((a, b) => a.price - b.price);
    if (sortVal === 'price-desc') visible.sort((a, b) => b.price - a.price);
    if (sortVal === 'area-desc') visible.sort((a, b) => b.area - a.area);

    grid.innerHTML = visible.map(listingCardHTML).join('');
    resultCount.innerHTML = `<strong>${visible.length}</strong> propert${visible.length === 1 ? 'y' : 'ies'} found`;
    emptyState.hidden = visible.length !== 0;

    document.getElementById('countAll').textContent = `(${PROPERTIES.length})`;
    document.getElementById('countSale').textContent = `(${PROPERTIES.filter((p) => p.purpose === 'sale').length})`;
    document.getElementById('countRent').textContent = `(${PROPERTIES.filter((p) => p.purpose === 'rent').length})`;
  }

  applyFilters();
});
