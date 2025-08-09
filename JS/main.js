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
    document.querySelector('.front-view').style.filter='blur(4px)';
    document.querySelector('.nav-btns-main').style.filter='blur(4px)';

    curr = 'Yes';
  } else {
    centerNav.style.animation = 'moveBehind 0.3s ease-in-out forwards';

    hamburger.innerHTML = '<i class="fa-solid fa-burger"></i>'

    document.querySelector('.front-view').style.filter='blur(0px)';
    document.querySelector('.nav-btns-main').style.filter='blur(0px)';
    setTimeout(() => {
      centerNav.classList.remove('show');
    }, 300); // Match the animation duration

    curr = 'No';
  }
});


// effect moving

anime.timeline({loop: true})
  .add({
    targets: '.ml5 .line',
    opacity: [0.5,1],
    scaleX: [0, 1],
    easing: "easeInOutExpo",
    duration: 700
  }).add({
    targets: '.ml5 .line',
    duration: 600,
    easing: "easeOutExpo",
    translateY: (el, i) => (-0.625 + 0.625*2*i) + "em"
  }).add({
    targets: '.ml5 .ampersand',
    opacity: [0,1],
    scaleY: [0.5, 1],
    easing: "easeOutExpo",
    duration: 600,
    offset: '-=600'
  }).add({
    targets: '.ml5 .letters-left',
    opacity: [0,1],
    translateX: ["0.5em", 0],
    easing: "easeOutExpo",
    duration: 600,
    offset: '-=300'
  }).add({
    targets: '.ml5 .letters-right',
    opacity: [0,1],
    translateX: ["-0.5em", 0],
    easing: "easeOutExpo",
    duration: 600,
    offset: '-=600'
  }).add({
    targets: '.ml5',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });