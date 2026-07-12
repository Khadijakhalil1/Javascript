// Asia Bazaar — Contact page interactions

document.addEventListener('DOMContentLoaded', () => {
  // Contact form — demo submit (no backend)
  const form = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    formSuccess.hidden = false;
    form.reset();
    formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach((item) => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach((i) => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
});
