// LOAD DOCTOR
const doctor = JSON.parse(localStorage.getItem('selectedDoctor'));
const doctorSummary = document.getElementById('doctorSummary');

if (doctor) {
  doctorSummary.innerHTML = `
    <div class="card p-3">
      <h5>${doctor.name}</h5>
      <p>${doctor.specialty}</p>
      <p>Fee: $${doctor.fee}</p>
      <p>Available: ${doctor.availableDays.join(', ')}</p>
    </div>
  `;
}

// DATE VALIDATION (TOMORROW MIN)
const dateInput = document.getElementById('date');
let tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
dateInput.min = tomorrow.toISOString().split('T')[0];

// FORM SUBMIT
const form = document.getElementById('appointmentForm');
const confirmation = document.getElementById('confirmation');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const age = parseInt(document.getElementById('age').value);
  const date = dateInput.value;
  const time = document.getElementById('time').value;
  const concern = document.getElementById('concern').value;

  const gender = document.querySelector('input[name="gender"]:checked');

  // VALIDATION
  if (!name || !email || !phone || !age || !date || !time || !gender) {
    alert('Please fill all fields');
    return;
  }

  if (!validateEmail(email)) {
    alert('Invalid email');
    return;
  }

  if (age < 1 || age > 120) {
    alert('Invalid age');
    return;
  }

  // GENERATE REF
  const ref = Math.floor(10000000 + Math.random() * 90000000);

  const appointment = {
    name,
    email,
    phone,
    age,
    gender: gender.value,
    concern,
    date,
    time,
    doctor: doctor.name,
    ref
  };

  // SAVE
  let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
  appointments.push(appointment);
  localStorage.setItem('appointments', JSON.stringify(appointments));

  // CONFIRMATION UI
  confirmation.innerHTML = `
    <div class="card p-3 bg-light">
      <h4>Appointment Confirmed</h4>
      <p><strong>Ref:</strong> ${ref}</p>
      <p><strong>Doctor:</strong> ${doctor.name}</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Time:</strong> ${time}</p>
      <p><strong>Patient:</strong> ${name}</p>

      <a href="appointments.html" class="btn btn-success mt-2">
        View My Appointments
      </a>
    </div>
  `;
});

// EMAIL VALIDATION
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}