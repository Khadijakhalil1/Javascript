// Asia Bazaar — Cart page interactions

document.addEventListener('DOMContentLoaded', () => {
  const cartItems = document.getElementById('cartItems');
  const emptyCart = document.getElementById('emptyCart');
  const navBadge = document.getElementById('navCartBadge');

  const SHIPPING_FLAT = 4.99;
  const FREE_SHIPPING_THRESHOLD = 50;
  const TAX_RATE = 0.05;

  function getRows() {
    return Array.from(cartItems.querySelectorAll('.cart-row:not(.cart-row-header)'));
  }

  function formatMoney(n) {
    return `$${n.toFixed(2)}`;
  }

  function recalc() {
    const rows = getRows();
    let subtotal = 0;
    let totalQty = 0;

    rows.forEach((row) => {
      const price = parseFloat(row.dataset.price);
      const qty = parseInt(row.querySelector('.qty-val').textContent, 10);
      const subtotalCell = row.querySelector('.cart-subtotal');
      const rowTotal = price * qty;
      subtotalCell.textContent = formatMoney(rowTotal);
      subtotal += rowTotal;
      totalQty += qty;
    });

    const shipping = rows.length === 0 ? 0 : subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT;
    const tax = subtotal * TAX_RATE;
    const total = subtotal + shipping + tax;

    document.getElementById('sumSubtotal').textContent = formatMoney(subtotal);
    document.getElementById('sumShipping').textContent = shipping === 0 ? 'Free' : formatMoney(shipping);
    document.getElementById('sumTax').textContent = formatMoney(tax);
    document.getElementById('sumTotal').textContent = formatMoney(total);

    if (navBadge) navBadge.textContent = totalQty;

    emptyCart.hidden = rows.length !== 0;
    document.querySelector('.cart-row-header').style.display = rows.length === 0 ? 'none' : '';
    document.querySelector('.cart-actions-row').style.display = rows.length === 0 ? 'none' : '';

    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
      if (rows.length === 0) {
        checkoutBtn.setAttribute('aria-disabled', 'true');
        checkoutBtn.style.pointerEvents = 'none';
        checkoutBtn.style.opacity = '0.5';
      } else {
        checkoutBtn.removeAttribute('aria-disabled');
        checkoutBtn.style.pointerEvents = '';
        checkoutBtn.style.opacity = '';
      }
    }
  }

  function wireRow(row) {
    const qtyVal = row.querySelector('.qty-val');
    row.querySelector('.qty-plus').addEventListener('click', () => {
      qtyVal.textContent = parseInt(qtyVal.textContent, 10) + 1;
      recalc();
    });
    row.querySelector('.qty-minus').addEventListener('click', () => {
      const current = parseInt(qtyVal.textContent, 10);
      if (current > 1) {
        qtyVal.textContent = current - 1;
        recalc();
      }
    });
    row.querySelector('.remove-btn').addEventListener('click', () => {
      row.classList.add('removing');
      setTimeout(() => {
        row.remove();
        recalc();
      }, 220);
    });
  }

  getRows().forEach(wireRow);
  recalc();
});
