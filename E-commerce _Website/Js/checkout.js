// Asia Bazaar — Checkout page interactions

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('checkoutForm');
  const cardFields = document.getElementById('cardFields');
  const shippingRadios = form.querySelectorAll('input[name="shipping"]');
  const paymentRadios = form.querySelectorAll('input[name="payment"]');
  const checkoutShipping = document.getElementById('checkoutShipping');
  const checkoutTotal = document.getElementById('checkoutTotal');

  const SUBTOTAL = 180.0;
  const TAX = 9.0;
  const SHIPPING_RATES = { standard: 4.99, express: 12.99 };

  function highlightActiveOption(radios) {
    radios.forEach((r) => {
      const option = r.closest('.radio-option');
      option.classList.toggle('active', r.checked);
    });
  }

  function recalcTotal() {
    const shippingVal = form.querySelector('input[name="shipping"]:checked').value;
    const shippingCost = SHIPPING_RATES[shippingVal];
    checkoutShipping.textContent = `$${shippingCost.toFixed(2)}`;
    checkoutTotal.textContent = `$${(SUBTOTAL + TAX + shippingCost).toFixed(2)}`;
  }

  shippingRadios.forEach((r) => {
    r.addEventListener('change', () => {
      highlightActiveOption(shippingRadios);
      recalcTotal();
    });
  });

  paymentRadios.forEach((r) => {
    r.addEventListener('change', () => {
      highlightActiveOption(paymentRadios);
      cardFields.style.display = r.value === 'card' && r.checked ? 'grid' : cardFields.style.display;
      if (r.checked) {
        cardFields.style.display = r.value === 'card' ? 'grid' : 'none';
      }
    });
  });

  // Simple card number spacing (visual only, demo purposes)
  const cardNumber = document.getElementById('cardNumber');
  if (cardNumber) {
    cardNumber.addEventListener('input', () => {
      let digits = cardNumber.value.replace(/\D/g, '').slice(0, 16);
      cardNumber.value = digits.replace(/(.{4})/g, '$1 ').trim();
    });
  }
  const cardExpiry = document.getElementById('cardExpiry');
  if (cardExpiry) {
    cardExpiry.addEventListener('input', () => {
      let digits = cardExpiry.value.replace(/\D/g, '').slice(0, 4);
      cardExpiry.value = digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
    });
  }

  recalcTotal();

  // Submit — demo confirmation (no real backend / payment gateway)
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const orderNum = `#AB-${Math.floor(10000 + Math.random() * 89999)}`;
    document.getElementById('orderNumber').textContent = orderNum;
    form.style.display = 'none';
    document.querySelector('.checkout-steps .step.active').classList.remove('active');
    document.querySelector('.checkout-steps .step.active')?.classList.add('done');
    const steps = document.querySelectorAll('.checkout-steps .step');
    steps[1].classList.remove('active');
    steps[1].classList.add('done');
    steps[1].querySelector('.step-num').textContent = '✓';
    steps[2].classList.add('active');
    steps[2].querySelector('.step-num').textContent = '✓';
    document.getElementById('orderConfirmation').hidden = false;
    document.getElementById('orderConfirmation').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
