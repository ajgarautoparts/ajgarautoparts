/* ================= MENU TOGGLE ================= */
const showMenu = (toggleId, navId) =>{
  const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId);

  if(toggle && nav){
    toggle.addEventListener('click', () =>{
      nav.classList.toggle('show-menu');
      toggle.classList.toggle('show-icon');
    });
  }
};
showMenu('nav-toggle','nav-menu');

/* ================= DROPDOWN ================= */
const dropdownItems = document.querySelectorAll('.dropdown__item');

dropdownItems.forEach((item) =>{
  const dropdownButton = item.querySelector('.dropdown__button');

  dropdownButton.addEventListener('click', () =>{
    const showDropdown = document.querySelector('.show-dropdown');
    toggleItem(item);

    if(showDropdown && showDropdown !== item){
      toggleItem(showDropdown);
    }
  });
});

const toggleItem = (item) =>{
  const dropdownContainer = item.querySelector('.dropdown__container');

  if(item.classList.contains('show-dropdown')){
    dropdownContainer.removeAttribute('style');
    item.classList.remove('show-dropdown');
  } else{
    dropdownContainer.style.height = dropdownContainer.scrollHeight + 'px';
    item.classList.add('show-dropdown');
  }
};

/* ================= FIREBASE AUTH ================= */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCvJ1h4CYZFr9h20O5zaxN6eoJtsQQypqs",
  authDomain: "ajgar-auto-parts.firebaseapp.com",
  projectId: "ajgar-auto-parts",
  storageBucket: "ajgar-auto-parts.appspot.com",
  messagingSenderId: "504184526438",
  appId: "1:504184526438:web:fd970aa45dcb29131fffa7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const userStatus = document.getElementById("user-status");
const loginLink = document.getElementById("loginLink");
const logoutBtn = document.getElementById("logoutBtn");

/* ===== LOGIN STATE ===== */
onAuthStateChanged(auth, (user) => {
  if (user) {
    userStatus.innerText = user.email;
    loginLink.style.display = "none";
    logoutBtn.style.display = "inline-block";

    localStorage.setItem("loggedUser", user.email);
  } else {
    userStatus.innerText = "";
    loginLink.style.display = "inline-block";
    logoutBtn.style.display = "none";

    localStorage.removeItem("loggedUser");
  }
});

/* ===== LOGOUT ===== */
logoutBtn.addEventListener("click", () => {
  signOut(auth).then(() => {
    window.location.href = "index.html";
  });
});
