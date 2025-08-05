window.addEventListener("DOMContentLoaded", () => {
    const video = document.querySelector(".video");
    video.playbackRate = 0.6;
});


const hamburger = document.querySelector('.hamburger');
const nav_btns = document.querySelector('.nav-btns');
const centerNav = document.querySelector('.center-nav');
let currMode = 'No';

hamburger.addEventListener('click', () => {
  if (currMode === 'No') {
    centerNav.classList.add('show');
    nav_btns.classList.add('show');
    centerNav.style.animation = 'moveForward 0.3s ease-in-out forwards';

    hamburger.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>'

    currMode = 'Yes';
  } else {
    centerNav.style.animation = 'moveBehind 0.3s ease-in-out forwards';

    hamburger.innerHTML = '<i class="fa-solid fa-burger"></i>'

    setTimeout(() => {
      centerNav.classList.remove('show');
    }, 300); // Match the animation duration

    currMode = 'No';
  }
});
