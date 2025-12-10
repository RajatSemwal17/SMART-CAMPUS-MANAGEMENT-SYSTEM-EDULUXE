

const groupSelect = document.querySelector('.selectGroup');
const generate = document.querySelector('.generate');
const table = document.querySelector('table');
const timeSlots = ["9:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00", "12:00 - 1:00", "1:00 - 2:00", "2:00 - 3:00", "3:00 - 4:00"];
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

let timetableData = {};
// 1️⃣ Fetch from JSON server and map by group so existing rendering code works
fetch("http://localhost:3000/timetables")
  .then(res => res.json())
  .then(data => {
    // json-server returns an array of timetable objects [{id, group, Monday,...}, ...]
    // convert to an object keyed by group: { G1: {id, group, Monday...}, ... }
    timetableData = {};
    if (Array.isArray(data)) {
      data.forEach(item => {
        if (item && item.group) timetableData[item.group] = item;
      });
    } else if (data && typeof data === 'object') {
      // fallback: if the data is already an object keyed by group
      timetableData = data;
    }
    console.log("Data fetched and mapped:", timetableData);
  })
  .catch(err => console.error("Error fetching timetables:", err));

// 2️⃣ Generate table when user clicks
generate.addEventListener('click', () => {
  const selectedGroup = groupSelect.value;
  if (!selectedGroup) {
    alert("Please select an option.");
    return;
  }
  if (!timetableData || Object.keys(timetableData).length === 0) {
    alert("Timetable data is still loading — please wait a moment and try again.");
    return;
  }
  if (!timetableData[selectedGroup]) {
    alert("No timetable found for selected group.");
    return;
  }

  table.innerHTML = "";

  let html = `<thead><tr><th>TIME</th>`;
  timeSlots.forEach(time => html += `<th>${time}</th>`);
  html += "</tr></thead><tbody>";

  days.forEach(day => {
    html += `<tr><td><strong>${day}</strong></td>`;
    timeSlots.forEach(time => {
      const val = timetableData[selectedGroup][day][time] || "";
      html += val === "BREAK"
        ? `<td style="background-color: rgba(64, 255, 0, 0.52);">${val}</td>`
        : `<td>${val}</td>`;
    });
    html += "</tr>";
  });

  html += "</tbody>";

  document.querySelector('.loader').style.display = 'flex';
  setTimeout(() => {
    document.querySelector('.loader').style.display = 'none';
    table.innerHTML = html;
  }, 4000);
});





import { learning } from './data/products.js';

let learnHTML = '';
learning.forEach((learn) => {
  learnHTML += `
  <div class="my-card">
  <img src="images/courses.png" alt="Logo">
  <i class="fa-solid fa-star star"></i>
      <div class="card-content" onclick="window.location.href='${learn.href}'">
      <h3>${learn.heading} <i class="fa-brands fa-youtube" style="color:red;"></i></h3>
      
        <p>SOME GOOD YOUTUBE CHANNELS</p>
        <a style="color:#65fb01;">View Page <i class="fa-solid fa-arrow-right"></i></a>
        </div>
        </div>
        </div>
  `
})
document.querySelector('.learning').innerHTML = learnHTML;



let savedStar = JSON.parse(localStorage.getItem('star-mark')) || [];
let stars = document.querySelectorAll('.star');
let marked_titles = document.querySelector('.marked-titles');

function updateTitles() {
  marked_titles.innerHTML = '';
  savedStar.forEach((a, i) => {
    if (a === 'mark')
      marked_titles.innerHTML += `<span>${learning[i].heading}</span>`
  });
}

stars.forEach((star, index) => {
  if (savedStar[index] === 'mark') {
    star.style.color = 'rgba(243, 197, 13, 1)';
  }
  else {
    star.style.color = 'rgb(128, 128, 125)';
  }

  star.addEventListener('click', () => {
    if (savedStar[index] === 'mark') {
      star.style.color = 'rgb(128, 128, 125)';
      savedStar[index] = 'unmark';
    }
    else {
      star.style.color = 'rgba(243, 197, 13, 1)';
      savedStar[index] = 'mark';
    }
    localStorage.setItem('star-mark', JSON.stringify(savedStar));
    updateTitles();
  });
});
updateTitles();