// NestFinder Pro — Agent Profile page

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const agent = AGENTS.find((a) => a.id === id);

  const content = document.getElementById('agentProfileContent');
  const notFoundState = document.getElementById('notFoundState');

  if (!agent) {
    content.hidden = true;
    notFoundState.hidden = false;
    return;
  }

  document.title = `${agent.name} — NestFinder Pro`;
  document.getElementById('breadcrumbName').textContent = agent.name;

  const listings = PROPERTIES.filter((p) => p.agentId === agent.id);

  function priceLabel(p) {
    return p.purpose === 'rent' ? `$${p.price.toLocaleString()}<span>/month</span>` : `$${p.price.toLocaleString()}`;
  }

  content.innerHTML = `
    <div class="container agent-profile-layout">
      <div class="agent-profile-sidebar">
        <img src="${agent.photo}" alt="${agent.name}">
        <h1>${agent.name}</h1>
        <span class="specialty">${agent.title}</span>
        <div class="profile-rating">★★★★★ ${agent.rating} (${agent.reviews} reviews)</div>
        <a href="tel:${agent.phone}" class="btn btn-primary profile-book-btn">📞 ${agent.phone}</a>
        <a href="mailto:${agent.email}" class="btn btn-outline profile-book-btn">✉️ Email Agent</a>
        <div class="profile-languages">
          <h4>Specialty</h4>
          <p>${agent.specialty}</p>
        </div>
      </div>

      <div class="agent-profile-main">
        <section class="profile-block">
          <h2>About ${agent.name}</h2>
          <p>${agent.bio}</p>
        </section>

        <section class="profile-block">
          <h2>Listings Managed by ${agent.name.split(' ')[0]}</h2>
          <div class="property-grid" style="margin-top:8px;">
            ${listings.length === 0 ? '<p class="section-sub">No active listings right now — check back soon.</p>' : listings.map((p) => `
              <div class="property-card">
                <a href="property-detail.html?id=${p.id}">
                  <div class="property-thumb">
                    <span class="${p.purpose === 'rent' ? 'property-tag for-rent' : 'property-tag'}">${p.tag}</span>
                    <img src="${p.image}" alt="${p.title}">
                  </div>
                  <div class="property-info">
                    <div class="property-price">${priceLabel(p)}</div>
                    <h3>${p.title}</h3>
                    <div class="property-location">📍 ${p.location}</div>
                  </div>
                </a>
              </div>
            `).join('')}
          </div>
        </section>

        <section class="profile-block">
          <h2>Send ${agent.name.split(' ')[0]} a Message</h2>
          <div class="enquiry-card" style="max-width:520px;">
            <form id="agentEnquiryForm">
              <label class="field field-full">
                <span>Full Name</span>
                <input type="text" name="name" placeholder="e.g. Khadija Khalil" required>
              </label>
              <label class="field field-full">
                <span>Email</span>
                <input type="email" name="email" placeholder="you@example.com" required>
              </label>
              <label class="field field-full">
                <span>Phone</span>
                <input type="tel" name="phone" placeholder="e.g. 0300 1234567" required>
              </label>
              <label class="field field-full">
                <span>Message</span>
                <textarea name="message" rows="3" placeholder="I'd like to talk about...">Hi ${agent.name.split(' ')[0]}, I'd like some guidance on finding a property.</textarea>
              </label>
              <button type="submit" class="btn btn-primary" style="width:100%;justify-content:center;">Send Message →</button>
              <p class="form-success" id="agentEnquirySuccess" hidden>✓ Thanks — ${agent.name.split(' ')[0]} will get back to you shortly.</p>
            </form>
          </div>
        </section>
      </div>
    </div>
  `;

  document.getElementById('agentEnquiryForm').addEventListener('submit', (e) => {
    e.preventDefault();
    if (!e.target.checkValidity()) {
      e.target.reportValidity();
      return;
    }
    document.getElementById('agentEnquirySuccess').hidden = false;
    e.target.querySelector('button[type="submit"]').disabled = true;
  });
});
