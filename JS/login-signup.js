let input = document.querySelector('#input');
let password = document.querySelector('#password');
let loginBtn = document.querySelector('.login-btn');
let toast = document.querySelector('#toast');
let toast_p = document.querySelector('#toast p');
let loaderBar = document.querySelector('.loader div');

let hideToastTimeout;

function showToast(message, type = "error") {
  toast_p.innerHTML = `<i class="fa-solid fa-triangle-exclamation" style="color: rgb(255, 251, 0);"></i> ` + message;

  // Set color based on type
  if (type === "success") toast.style.background = "#2ecc71";
  else if (type === "info") toast.style.background = "#3498db";
  else toast.style.background = "#e74c3c";

  toast.classList.add("show");

  // Reset and restart loader animation
  loaderBar.classList.remove("animate");
  void loaderBar.offsetWidth; // trick to restart CSS animation
  loaderBar.classList.add("animate");

  // Clear old timeout and start fresh
  clearTimeout(hideToastTimeout);
  hideToastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

function loginFormRequirements() {
  let input_val = input.value.trim();
  let password_val = password.value.trim();

  if (input_val === "" || password_val === "") {
    showToast('DO NOT KEEP ANY FIELD EMPTY', "error");
  } 
  else if (input_val.length < 3) {
    showToast('❌=Username must be at least 3 characters', "error");
  } 
  else if (password_val.length < 6) {
    showToast('❌ Password must be at least 6 characters', "error");
  } 
  else if (!/[A-Z]/.test(password_val)) {
    showToast('Password must contain at least one uppercase letter', "error");
  } 
  else if (!/[0-9]/.test(password_val)) {
    showToast('Password must contain at least one number', "error");
  } 
  else {
    showToast('FORM SUBMITTED SUCCESSFULLY', "success");
    setTimeout(() => {
      location.reload();
    }, 3000)
  }
}

loginBtn.addEventListener('click', () => {
  loginFormRequirements();
});

document.addEventListener('keydown', (event) => {
  if(event.key === 'Enter'){
    loginFormRequirements();
  }
});

let SIGNUP = document.querySelector('#SIGNUP-A')
SIGNUP.addEventListener('click', () => {
  document.querySelector('.signup').style.display = 'block';
  document.querySelector('.login').style.display = 'none';
})
let LOGIN = document.querySelector('#LOGIN-A')
LOGIN.addEventListener('click', () => {
  document.querySelector('.signup').style.display = 'none';
  document.querySelector('.login').style.display = 'block';
})