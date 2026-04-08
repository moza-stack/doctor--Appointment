let doctors = [];
let filteredDoctors = [];

const container = document.getElementById('doctorsContainer');
const searchInput = document.getElementById('searchInput');
const specialtyFilter = document.getElementById('specialtyFilter');
const sortSelect = document.getElementById('sortSelect');

// FETCH DATA
fetch('data/data.json')
  .then(res => res.json())
  .then(data => {
    doctors = data.doctors;
    filteredDoctors = [...doctors];
    renderDoctors(filteredDoctors);
  });

// RENDER
function renderDoctors(list) {
  container.innerHTML = '';

  list.forEach(doc => {
    container.innerHTML += `
      <div class="col-md-4">
        <div class="card p-3 text-center">
          <div class="avatar mb-2">${getInitials(doc.name)}</div>
          <h5>${doc.name}</h5>
          <span class="badge bg-primary">${doc.specialty}</span>
          <p>${renderStars(doc.rating)}</p>
          <p>${doc.experience} yrs experience</p>
          <p>${doc.availableDays.join(', ')}</p>

          <button class="btn btn-success"
            onclick='bookDoctor(${JSON.stringify(doc)})'>
            Book Appointment
          </button>
        </div>
      </div>
    `;
  });
}

// SEARCH
searchInput.addEventListener('keyup', applyFilters);

// FILTER
specialtyFilter.addEventListener('change', applyFilters);

// SORT
sortSelect.addEventListener('change', () => {
  if (sortSelect.value === 'rating') {
    filteredDoctors.sort((a, b) => b.rating - a.rating);
  } else if (sortSelect.value === 'experience') {
    filteredDoctors.sort((a, b) => b.experience - a.experience);
  }
  renderDoctors(filteredDoctors);
});

// APPLY FILTERS
function applyFilters() {
  const search = searchInput.value.toLowerCase();
  const spec = specialtyFilter.value;

  filteredDoctors = doctors.filter(doc => {
    const matchesSearch =
      doc.name.toLowerCase().includes(search) ||
      doc.specialty.toLowerCase().includes(search);

    const matchesSpec = spec === 'All' || doc.specialty === spec;

    return matchesSearch && matchesSpec;
  });

  renderDoctors(filteredDoctors);
}

// BOOK
function bookDoctor(doc) {
  localStorage.setItem('selectedDoctor', JSON.stringify(doc));
  alert('Doctor selected! Redirecting...');
  window.location.href = 'booking.html';
}

// HELPERS
function renderStars(rating) {
  return '⭐'.repeat(Math.round(rating));
}

function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('');
}