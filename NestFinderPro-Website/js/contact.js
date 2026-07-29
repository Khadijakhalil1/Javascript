// NestFinder Pro — Contact page
// Submits as a general enquiry (no propertyId/agentId) to the same
// backend used by the property detail and agent profile enquiry forms.

const API_BASE = 'http://localhost:3000';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  const formError = document.getElementById('contactError');
  const submitBtn = document.getElementById('contactSubmitBtn');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    formError.hidden = true;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    try {
      const res = await fetch(`${API_BASE}/api/enquiries`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          propertyTitle: `[${formData.get('subject')}]`,
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          message: formData.get('message'),
        }),
      });
      if (!res.ok) throw new Error();
      formSuccess.hidden = false;
      form.reset();
      formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } catch (err) {
      formError.textContent = "Couldn't reach the server. Make sure the backend is running (see /backend/README instructions), then try again.";
      formError.hidden = false;
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message →';
    }
  });
});
