/* ================= MENU TOGGLE ================= */
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show-menu");
    navToggle.classList.toggle("show-icon");
  });
}

/* ================= DROPDOWN ================= */
const dropdownItems = document.querySelectorAll(".dropdown__item");

dropdownItems.forEach((item) => {
  const button = item.querySelector(".dropdown__button");

  button.addEventListener("click", () => {
    item.classList.toggle("show-dropdown");
  });
});

/* ================= FIREBASE AUTH ================= */
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

/* ================= LOGIN STATE ================= */
onAuthStateChanged(auth, (user) => {
  if (user) {
    userStatus.textContent = user.email;
    loginLink.style.display = "none";
    logoutBtn.style.display = "inline-block";
    localStorage.setItem("loggedUser", user.email);
  } else {
    userStatus.textContent = "";
    loginLink.style.display = "inline-block";
    logoutBtn.style.display = "none";
    localStorage.removeItem("loggedUser");
  }
});

/* ================= LOGOUT ================= */
logoutBtn.addEventListener("click", () => {
  signOut(auth).then(() => {
    window.location.reload();
  });
});

/* ================= CART COUNT ================= */
const cartCount = document.getElementById("cart-count");
const user = localStorage.getItem("loggedUser");
const cartKey = user ? "cart_" + user : "cart_guest";
const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

cartCount.textContent = cart.reduce((sum, p) => sum + p.qty, 0);

/* ================= AUTO ADD TO CART (ALL PRODUCTS) ================= */

document.addEventListener("click", function (e) {

  const card = e.target.closest(".des-card");
  if (!card) return;

  const name = card.dataset.name;
  const price = Number(card.dataset.price);
  const image = card.dataset.image;

  if (!name || !price) return;

  const user = localStorage.getItem("loggedUser");
  const cartKey = user ? "cart_" + user : "cart_guest";

  let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  const existing = cart.find(p => p.name === name);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      name: name,
      price: price,
      image: image,
      qty: 1
    });
  }

  localStorage.setItem(cartKey, JSON.stringify(cart));
  alert(name + " added to cart");

  // update cart count live
  const cartCount = document.getElementById("cart-count");
  if (cartCount) {
    cartCount.textContent = cart.reduce((s, p) => s + p.qty, 0);
  }

});
