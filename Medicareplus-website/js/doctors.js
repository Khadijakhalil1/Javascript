// MediCare Plus — Doctors Directory real-time search

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('doctorSearch');
  const doctorCards = Array.from(document.querySelectorAll('.doctor-card'));
  const resultCount = document.getElementById('searchResultCount');
  const emptyState = document.getElementById('noDoctorsFound');
  const totalCount = doctorCards.length;

  function filterDoctors() {
    const term = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    doctorCards.forEach((card) => {
      const name = card.dataset.name || '';
      const specialty = card.dataset.specialty || '';
      const matches = !term || name.includes(term) || specialty.includes(term);
      card.style.display = matches ? '' : 'none';
      if (matches) visibleCount += 1;
    });

    if (!term) {
      resultCount.textContent = `Showing all ${totalCount} doctors`;
    } else {
      resultCount.textContent = `${visibleCount} doctor${visibleCount === 1 ? '' : 's'} found for "${searchInput.value.trim()}"`;
    }

    emptyState.hidden = visibleCount !== 0;
  }

  // Real-time filtering as the user types — no submit button needed
  searchInput.addEventListener('input', filterDoctors);

  filterDoctors();
});
