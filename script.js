/* ========= FIREBASE AUTH HEADER CONTROL ========= */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

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

/* ===== AUTH STATE ===== */
onAuthStateChanged(auth, (user) => {
  if (user) {
    // LOGIN SUCCESS
    userStatus.innerText = user.email;
    loginLink.style.display = "none";
    logoutBtn.style.display = "inline-block";

    // save for cart
    localStorage.setItem("loggedUser", user.email);
  } else {
    // LOGOUT
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
