// Asia Bazaar — Product Listing page interactions

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('productGrid');
  const cards = Array.from(grid.querySelectorAll('.product-card'));
  const searchInput = document.getElementById('searchInput');
  const categoryFilters = document.getElementById('categoryFilters');
  const priceRange = document.getElementById('priceRange');
  const priceValue = document.getElementById('priceValue');
  const sortSelect = document.getElementById('sortSelect');
  const resultCount = document.getElementById('resultCount');
  const emptyState = document.getElementById('emptyState');
  const resetBtn = document.getElementById('resetFilters');

  function getCheckedCategories() {
    const boxes = Array.from(categoryFilters.querySelectorAll('input[type="checkbox"]'));
    const allBox = boxes.find((b) => b.value === 'all');
    const others = boxes.filter((b) => b.value !== 'all');
    const checkedOthers = others.filter((b) => b.checked).map((b) => b.value);
    if (allBox.checked || checkedOthers.length === 0) return null; // null = no category filter
    return checkedOthers;
  }

  // "All Products" checkbox clears the others; picking any specific one unchecks "All"
  categoryFilters.addEventListener('change', (e) => {
    const boxes = Array.from(categoryFilters.querySelectorAll('input[type="checkbox"]'));
    const allBox = boxes.find((b) => b.value === 'all');
    if (e.target === allBox && allBox.checked) {
      boxes.forEach((b) => { if (b !== allBox) b.checked = false; });
    } else if (e.target !== allBox && e.target.checked) {
      allBox.checked = false;
    }
    applyFilters();
  });

  priceRange.addEventListener('input', () => {
    priceValue.textContent = `$${priceRange.value}`;
    applyFilters();
  });

  searchInput.addEventListener('input', applyFilters);
  sortSelect.addEventListener('change', applyFilters);

  resetBtn.addEventListener('click', () => {
    searchInput.value = '';
    priceRange.value = 150;
    priceValue.textContent = '$150';
    sortSelect.value = 'featured';
    const boxes = Array.from(categoryFilters.querySelectorAll('input[type="checkbox"]'));
    boxes.forEach((b) => (b.checked = b.value === 'all'));
    applyFilters();
  });

  function applyFilters() {
    const term = searchInput.value.trim().toLowerCase();
    const maxPrice = parseFloat(priceRange.value);
    const categories = getCheckedCategories();

    let visible = cards.filter((card) => {
      const name = card.dataset.name.toLowerCase();
      const price = parseFloat(card.dataset.price);
      const cat = card.dataset.category;

      const matchesSearch = !term || name.includes(term);
      const matchesPrice = price <= maxPrice;
      const matchesCategory = !categories || categories.includes(cat);

      return matchesSearch && matchesPrice && matchesCategory;
    });

    // sort
    const sortVal = sortSelect.value;
    if (sortVal === 'price-asc') visible.sort((a, b) => a.dataset.price - b.dataset.price);
    if (sortVal === 'price-desc') visible.sort((a, b) => b.dataset.price - a.dataset.price);
    if (sortVal === 'name-asc') visible.sort((a, b) => a.dataset.name.localeCompare(b.dataset.name));

    // re-render order + visibility
    cards.forEach((c) => (c.style.display = 'none'));
    visible.forEach((c) => {
      c.style.display = '';
      grid.appendChild(c);
    });

    resultCount.innerHTML = `<strong>${visible.length}</strong> product${visible.length === 1 ? '' : 's'} found`;
    emptyState.hidden = visible.length !== 0;
  }

  applyFilters();
});
