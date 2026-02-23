/* ================= MENU ================= */
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show-menu");
    navToggle.classList.toggle("show-icon");
  });
}

/* ================= FIREBASE ================= */
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

/* ================= LOGIN STATE ================= */
onAuthStateChanged(auth, (user) => {
  if (user) {
    localStorage.setItem("loggedUser", user.email);
  } else {
    localStorage.removeItem("loggedUser");
  }
});

/* ================= CART ================= */
function cartKey() {
  const u = localStorage.getItem("loggedUser");
  return u ? "cart_" + u : "cart_guest";
}

function getCart() {
  return JSON.parse(localStorage.getItem(cartKey())) || [];
}

function saveCart(c) {
  localStorage.setItem(cartKey(), JSON.stringify(c));
}

function updateCartCount() {
  const el = document.getElementById("cart-count");
  if (!el) return;
  const cart = getCart();
  el.innerText = cart.reduce((t, i) => t + i.qty, 0);
}

/* ================= ADD TO CART + BUY NOW ================= */
document.addEventListener("click", (e) => {

  const card = e.target.closest(".product-card");
  if (!card) return;

  const name = card.dataset.name;
  const price = Number(card.dataset.price);
  const image = card.dataset.image;

  // ADD TO CART
  if (e.target.classList.contains("add-to-cart-btn")) {

    if (!localStorage.getItem("loggedUser")) {
      alert("please login first");
      location.href = "login.html";
      return;
    }

    let cart = getCart();
    let item = cart.find(p => p.name === name);

    if (item) item.qty++;
    else cart.push({ name, price, image, qty: 1 });

    saveCart(cart);
    updateCartCount();
    alert("added to cart");
  }

  // BUY NOW
  if (e.target.classList.contains("buy-now-btn")) {

    saveCart([{ name, price, image, qty: 1 }]);
    location.href = "cart.html";
  }

});

updateCartCount();
