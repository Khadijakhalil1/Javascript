// Asia Bazaar — Home page interactions

document.addEventListener('DOMContentLoaded', () => {
  // Product tab filters (visual state only on Day 1 — full filtering logic
  // will be wired up on the Product Listing page)
  const tabs = document.querySelectorAll('.tab-filters button');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  // Quick "add to cart" feedback + badge counter demo
  const cartBadge = document.querySelector('.icon-btn .badge');
  let cartCount = parseInt(cartBadge?.textContent || '0', 10);

  document.querySelectorAll('.add-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      cartCount += 1;
      if (cartBadge) cartBadge.textContent = cartCount;
      btn.textContent = '✓';
      setTimeout(() => (btn.textContent = '+'), 800);
    });
  });

  // Wishlist heart toggle
  document.querySelectorAll('.product-wish').forEach((wish) => {
    wish.addEventListener('click', () => {
      const active = wish.textContent.includes('♥');
      wish.textContent = active ? '♡' : '♥';
      wish.style.color = active ? '' : '#FF4433';
    });
  });
});
