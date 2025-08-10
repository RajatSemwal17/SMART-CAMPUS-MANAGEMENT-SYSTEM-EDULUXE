const hamburger = document.querySelector('.hamburger');
const nav_btns = document.querySelector('.nav-btns');
const centerNav = document.querySelector('.center-nav');
let body = document.querySelector('body');
let curr = 'No';
hamburger.addEventListener('click', () => {
  if (curr === 'No') {
    centerNav.classList.add('show');
    nav_btns.classList.add('show');
    centerNav.style.animation = 'moveForward 0.3s ease-in-out forwards';

    hamburger.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>';

    curr = 'Yes';
  } else {
    centerNav.style.animation = 'moveBehind 0.3s ease-in-out forwards';

    hamburger.innerHTML = '<i class="fa-solid fa-burger"></i>';
    setTimeout(() => {
      centerNav.classList.remove('show');
    }, 300); // Match the animation duration

    curr = 'No';
  }
});
