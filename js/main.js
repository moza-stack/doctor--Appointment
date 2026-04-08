//Home Page


const doctors = [
  { name: "Dr. Khalid Al-Farsi", specialty: "Pediatrics", rating: 5, exp: 12 },
  { name: "Dr. Sara Al-Rashidi", specialty: "Cardiology", rating: 4.9, exp: 14 },

  { name: "Dr.Layla Mansour ", specialty: "Dermatology", rating: 4.7, exp: 10 },
];

const container = document.getElementById("doctorContainer");

if (container) {
  container.innerHTML = doctors.map(d => `
    <div class="col-md-4">
      <div class="card p-3">
        <h5>${d.name}</h5>
        <p>${d.specialty}</p>
        <p>${"⭐".repeat(d.rating)}</p>
        <p>${d.exp} yrs experience</p>
      </div>
    </div>
  `).join('');
}

// Counters
document.getElementById("docCount").innerText = 25;
document.getElementById("patCount").innerText = 1200;
document.getElementById("specCount").innerText = 6;

// Dark mode
const toggle = document.getElementById("darkToggle");
toggle.onclick = () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("dark", document.body.classList.contains("dark"));
};

if (localStorage.getItem("dark") === "true") {
  document.body.classList.add("dark");
}


