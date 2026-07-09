// Asia Bazaar — Product Detail page interactions

document.addEventListener('DOMContentLoaded', () => {
  // Gallery thumbnail swap
  const mainImage = document.getElementById('mainImage');
  document.querySelectorAll('.thumb').forEach((thumb) => {
    thumb.addEventListener('click', () => {
      document.querySelectorAll('.thumb').forEach((t) => t.classList.remove('active'));
      thumb.classList.add('active');
      mainImage.src = thumb.dataset.img;
    });
  });

  // Color swatch selection
  const colorLabel = document.getElementById('colorLabel');
  document.querySelectorAll('.swatch').forEach((sw) => {
    sw.addEventListener('click', () => {
      document.querySelectorAll('.swatch').forEach((s) => s.classList.remove('active'));
      sw.classList.add('active');
      colorLabel.textContent = sw.dataset.value;
    });
  });

  // Size selection
  document.querySelectorAll('.size-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.size-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Quantity stepper
  const qtyValue = document.getElementById('qtyValue');
  const unitPrice = 59.0;
  let qty = 1;
  const addToCartBtn = document.getElementById('addToCartBtn');

  function updatePriceLabel() {
    addToCartBtn.textContent = `Add to Cart — $${(unitPrice * qty).toFixed(2)}`;
  }

  document.getElementById('qtyPlus').addEventListener('click', () => {
    qty += 1;
    qtyValue.textContent = qty;
    updatePriceLabel();
  });
  document.getElementById('qtyMinus').addEventListener('click', () => {
    qty = Math.max(1, qty - 1);
    qtyValue.textContent = qty;
    updatePriceLabel();
  });

  // Add to cart confirmation + cart badge bump
  const addConfirm = document.getElementById('addConfirm');
  const cartBadge = document.querySelector('.icon-btn .badge');
  addToCartBtn.addEventListener('click', () => {
    addConfirm.hidden = false;
    if (cartBadge) cartBadge.textContent = parseInt(cartBadge.textContent, 10) + qty;
    setTimeout(() => (addConfirm.hidden = true), 2200);
  });

  // Wishlist heart
  const wishBtn = document.querySelector('.wish-btn');
  if (wishBtn) {
    wishBtn.addEventListener('click', () => {
      const active = wishBtn.textContent.includes('♥');
      wishBtn.textContent = active ? '♡' : '♥';
      wishBtn.style.color = active ? '' : '#FF6B35';
    });
  }

  // Description tabs
  document.querySelectorAll('.tab-header').forEach((header) => {
    header.addEventListener('click', () => {
      document.querySelectorAll('.tab-header').forEach((h) => h.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach((p) => p.classList.remove('active'));
      header.classList.add('active');
      document.getElementById(`tab-${header.dataset.tab}`).classList.add('active');
    });
  });
});
