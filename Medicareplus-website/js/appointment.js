// MediCare Plus — Appointment Booking page
// Talks to the local backend API (backend/server.js) to actually save
// the appointment into database.db.

const API_BASE = 'http://localhost:3000';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('appointmentForm');
  const doctorSelect = document.getElementById('doctorSelect');
  const dateInput = document.getElementById('appointmentDate');
  const timeSelect = document.getElementById('timeSelect');
  const availabilityHint = document.getElementById('availabilityHint');
  const submitBtn = document.getElementById('submitBtn');
  const formError = document.getElementById('formError');
  const apiStatusBanner = document.getElementById('apiStatusBanner');

  const selectedDoctorCard = document.getElementById('selectedDoctorCard');
  const selectedDoctorPhoto = document.getElementById('selectedDoctorPhoto');
  const selectedDoctorName = document.getElementById('selectedDoctorName');
  const selectedDoctorSpecialty = document.getElementById('selectedDoctorSpecialty');

  // --- Populate doctor dropdown from the shared dataset ---
  DOCTORS.forEach((doc) => {
    const opt = document.createElement('option');
    opt.value = doc.id;
    opt.textContent = `${doc.name} — ${doc.specialty}`;
    doctorSelect.appendChild(opt);
  });

  // Preselect doctor if arriving from a profile page (?doctor=sarah)
  const params = new URLSearchParams(window.location.search);
  const preselectId = params.get('doctor');
  if (preselectId && DOCTORS.some((d) => d.id === preselectId)) {
    doctorSelect.value = preselectId;
  }

  // Don't allow booking in the past
  const today = new Date().toISOString().split('T')[0];
  dateInput.min = today;

  function getSelectedDoctor() {
    return DOCTORS.find((d) => d.id === doctorSelect.value);
  }

  function updateSidebarCard() {
    const doctor = getSelectedDoctor();
    if (!doctor) {
      selectedDoctorCard.hidden = true;
      return;
    }
    selectedDoctorPhoto.src = doctor.photo;
    selectedDoctorPhoto.alt = doctor.name;
    selectedDoctorName.textContent = doctor.name;
    selectedDoctorSpecialty.textContent = doctor.specialty;
    selectedDoctorCard.hidden = false;
  }

  function updateTimeSlots() {
    const doctor = getSelectedDoctor();
    timeSelect.innerHTML = '';

    if (!doctor || !dateInput.value) {
      const opt = document.createElement('option');
      opt.value = '';
      opt.disabled = true;
      opt.selected = true;
      opt.textContent = 'Select doctor & date first';
      timeSelect.appendChild(opt);
      timeSelect.disabled = true;
      availabilityHint.textContent = '';
      return;
    }

    const weekday = new Date(dateInput.value + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long' });
    const slots = doctor.availability[weekday] || [];

    if (slots.length === 0) {
      const opt = document.createElement('option');
      opt.value = '';
      opt.disabled = true;
      opt.selected = true;
      opt.textContent = 'No availability on this day';
      timeSelect.appendChild(opt);
      timeSelect.disabled = true;
      availabilityHint.textContent = `${doctor.name} isn't available on ${weekday}s. Try another date.`;
      return;
    }

    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.disabled = true;
    placeholder.selected = true;
    placeholder.textContent = `${slots.length} slot${slots.length === 1 ? '' : 's'} available`;
    timeSelect.appendChild(placeholder);

    slots.forEach((slot) => {
      const opt = document.createElement('option');
      opt.value = slot;
      opt.textContent = slot;
      timeSelect.appendChild(opt);
    });

    timeSelect.disabled = false;
    availabilityHint.textContent = `Showing ${weekday} availability for ${doctor.name}.`;
  }

  doctorSelect.addEventListener('change', () => {
    updateSidebarCard();
    updateTimeSlots();
  });
  dateInput.addEventListener('change', updateTimeSlots);

  updateSidebarCard();
  updateTimeSlots();

  // --- Submit: send to the backend API ---
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    formError.hidden = true;
    apiStatusBanner.hidden = true;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const doctor = getSelectedDoctor();
    const formData = new FormData(form);
    const payload = {
      doctorId: formData.get('doctorId'),
      doctorName: doctor ? doctor.name : '',
      patientName: formData.get('patientName'),
      patientEmail: formData.get('patientEmail'),
      patientPhone: formData.get('patientPhone'),
      appointmentDate: formData.get('appointmentDate'),
      appointmentTime: formData.get('appointmentTime'),
      notes: formData.get('notes'),
    };

    submitBtn.disabled = true;
    submitBtn.textContent = 'Booking…';

    try {
      const res = await fetch(`${API_BASE}/api/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody.error || 'Something went wrong saving your appointment.');
      }

      const created = await res.json();
      showConfirmation(created, doctor);
    } catch (err) {
      // Most likely cause during development: the backend server isn't running.
      apiStatusBanner.hidden = false;
      formError.hidden = false;
      formError.textContent = err.message.includes('fetch')
        ? "Couldn't reach the booking server. Make sure the backend is running (see banner above), then try again."
        : err.message;
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Confirm Appointment →';
    }
  });

  function showConfirmation(appointment, doctor) {
    document.querySelector('.booking-layout').hidden = true;
    const confirmation = document.getElementById('bookingConfirmation');
    const details = document.getElementById('confirmationDetails');

    details.innerHTML = `
      <div class="confirm-row"><span>Appointment ID</span><strong>#${appointment.id}</strong></div>
      <div class="confirm-row"><span>Doctor</span><strong>${appointment.doctor_name}</strong></div>
      <div class="confirm-row"><span>Date</span><strong>${appointment.appointment_date}</strong></div>
      <div class="confirm-row"><span>Time</span><strong>${appointment.appointment_time}</strong></div>
      <div class="confirm-row"><span>Patient</span><strong>${appointment.patient_name}</strong></div>
    `;
    confirmation.hidden = false;
    confirmation.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});
