/* ================= MENU ================= */
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("show-menu");
      navToggle.classList.toggle("show-icon");
    });
  }

  updateCartCount();
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
  projectId: "ajgar-auto-parts"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const userStatus = document.getElementById("user-status");
const loginLink = document.getElementById("loginLink");
const logoutBtn = document.getElementById("logoutBtn");

/* ================= LOGIN STATE ================= */
onAuthStateChanged(auth, user => {
  if (user) {
    localStorage.setItem("loggedUser", user.email);

    if (userStatus) userStatus.innerText = user.email;
    if (loginLink) loginLink.style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "inline-block";
  } else {
    localStorage.removeItem("loggedUser");

    if (userStatus) userStatus.innerText = "";
    if (loginLink) loginLink.style.display = "inline-block";
    if (logoutBtn) logoutBtn.style.display = "none";
  }

  updateCartCount();
});

/* ================= LOGOUT ================= */
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    signOut(auth).then(() => location.reload());
  });
}

/* ================= CART HELPERS ================= */
function cartKey() {
  const u = localStorage.getItem("loggedUser");
  return u ? "cart_" + u : "cart_guest";
}

function getCart() {
  return JSON.parse(localStorage.getItem(cartKey())) || [];
}

function saveCart(cart) {
  localStorage.setItem(cartKey(), JSON.stringify(cart));
}

function updateCartCount() {
  const el = document.getElementById("cart-count");
  if (!el) return;
  const cart = getCart();
  el.innerText = cart.reduce((t, i) => t + i.qty, 0);
}

/* ================= ADD TO CART + BUY NOW ================= */
document.addEventListener("click", e => {

  const card = e.target.closest(".product-card");
  if (!card) return;

  const name = card.dataset.name;
  const price = Number(card.dataset.price);
  const image = card.dataset.image;

  /* add to cart */
  if (e.target.classList.contains("add-to-cart-btn")) {

    if (!localStorage.getItem("loggedUser")) {
      alert("please login first");
      location.href = "login.html";
      return;
    }

    let cart = getCart();
    const item = cart.find(p => p.name === name);

    if (item) item.qty++;
    else cart.push({ name, price, image, qty: 1 });

    saveCart(cart);
    updateCartCount();
    alert("added to cart");
  }

  /* buy now */
  if (e.target.classList.contains("buy-now-btn")) {

    saveCart([{ name, price, image, qty: 1 }]);
    updateCartCount();
    location.href = "cart.html";
  }
});

