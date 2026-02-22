/* ================= MENU ================= */
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show-menu");
    navToggle.classList.toggle("show-icon");
  });
}

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
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    signOut(auth).then(() => location.reload());
  });
}

/* ================= CART SYSTEM ================= */

function getCartKey() {
  const user = localStorage.getItem("loggedUser");
  return user ? "cart_" + user : "cart_guest";
}

function getCart() {
  return JSON.parse(localStorage.getItem(getCartKey())) || [];
}

function saveCart(cart) {
  localStorage.setItem(getCartKey(), JSON.stringify(cart));
}

function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  if (!cartCount) return;

  const cart = getCart();
  cartCount.textContent = cart.reduce((t, p) => t + p.qty, 0);
}

/* ================= ADD TO CART (AUTO) ================= */
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart-btn")) {

    const card = e.target.closest(".product-card");
    const name = card.dataset.name;
    const price = Number(card.dataset.price);
    const image = card.dataset.image;

    const user = localStorage.getItem("loggedUser");
    if (!user) {
      alert("Please login to add product");
      location.href = "login.html";
      return;
    }

    let cart = getCart();
    let item = cart.find(p => p.name === name);

    if (item) {
      item.qty += 1;
    } else {
      cart.push({ name, price, image, qty: 1 });
    }

    saveCart(cart);
    updateCartCount();
    alert("Added to cart");
  }
});

updateCartCount();
