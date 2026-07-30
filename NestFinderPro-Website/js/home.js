// NestFinder Pro — Home page interactions

function formatPrice(property) {
  const amount = property.price.toLocaleString('en-US');
  return property.purpose === 'rent' ? `$${amount}<span>/month</span>` : `$${amount}`;
}

function propertyCardHTML(p) {
  const tagClass = p.purpose === 'rent' ? 'property-tag for-rent' : 'property-tag';
  return `
    <div class="property-card">
      <a href="pages/property-detail.html?id=${p.id}">
        <div class="property-thumb">
          <span class="${tagClass}">${p.tag}</span>
          <span class="property-wish">♡</span>
          <img src="${p.homeImage}" alt="${p.title}">
        </div>
        <div class="property-info">
          <div class="property-price">${formatPrice(p)}</div>
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
  const featuredGrid = document.getElementById('featuredGrid');
  if (featuredGrid) {
    const featured = PROPERTIES.slice(0, 6);
    featuredGrid.innerHTML = featured.map(propertyCardHTML).join('');
  }

  const heroForm = document.getElementById('heroSearchForm');
  if (heroForm) {
    heroForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const location = document.getElementById('heroLocation').value.trim();
      const type = document.getElementById('heroType').value;
      const budget = document.getElementById('heroBudget').value;

      const params = new URLSearchParams();
      if (location) params.set('location', location);
      if (type) params.set('type', type);
      if (budget) params.set('maxPrice', budget);

      window.location.href = `pages/listings.html?${params.toString()}`;
    });
  }
});
