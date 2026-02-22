/* ================= MOBILE NAV TOGGLE ================= */
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show-menu");
    navToggle.classList.toggle("show-icon");
  });
}

/* ================= DROPDOWN MENU ================= */
const dropdownItems = document.querySelectorAll(".dropdown__item");

dropdownItems.forEach((item) => {
  const dropdownButton = item.querySelector(".dropdown__button");

  if (dropdownButton) {
    dropdownButton.addEventListener("click", () => {
      const openItem = document.querySelector(".show-dropdown");
      toggleDropdown(item);

      if (openItem && openItem !== item) {
        toggleDropdown(openItem);
      }
    });
  }
});

function toggleDropdown(item) {
  const container = item.querySelector(".dropdown__container");

  if (item.classList.contains("show-dropdown")) {
    container.removeAttribute("style");
    item.classList.remove("show-dropdown");
  } else {
    container.style.height = container.scrollHeight + "px";
    item.classList.add("show-dropdown");
  }
}

/* RESET DROPDOWN ON DESKTOP */
const mediaQuery = window.matchMedia("(min-width: 1118px)");
window.addEventListener("resize", () => {
  if (mediaQuery.matches) {
    document
      .querySelectorAll(".dropdown__container")
      .forEach((el) => el.removeAttribute("style"));
    dropdownItems.forEach((el) => el.classList.remove("show-dropdown"));
  }
});

/* ================= SIMPLE SLIDER ================= */
let slideIndex = 0;
function showSlides() {
  const slides = document.getElementsByClassName("mySlides");
  if (!slides.length) return;

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slideIndex++;
  if (slideIndex > slides.length) slideIndex = 1;

  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 4000);
}
showSlides();

/* ================= IMAGE SCROLL SLIDER ================= */
function initSlider() {
  const imageList = document.querySelector(".slider-wrapper .image-list");
  const slideButtons = document.querySelectorAll(".slide-button");
  const scrollbarThumb = document.querySelector(".scrollbar-thumb");
  const scrollbar = document.querySelector(".slider-scrollbar");

  if (!imageList || !scrollbarThumb || !scrollbar) return;

  const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

  slideButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const dir = btn.id === "prev-slide" ? -1 : 1;
      imageList.scrollBy({
        left: imageList.clientWidth * dir,
        behavior: "smooth",
      });
    });
  });

  imageList.addEventListener("scroll", () => {
    const pos =
      (imageList.scrollLeft / maxScrollLeft) *
      (scrollbar.clientWidth - scrollbarThumb.offsetWidth);
    scrollbarThumb.style.left = pos + "px";
  });
}

window.addEventListener("load", initSlider);
window.addEventListener("resize", initSlider);

/* ================= CART SYSTEM ================= */
let currentUser = localStorage.getItem("loggedUser");

function getCartKey() {
  return currentUser ? "cart_" + currentUser : "cart_guest";
}

function getCart() {
  return JSON.parse(localStorage.getItem(getCartKey())) || [];
}

function saveCart(cart) {
  localStorage.setItem(getCartKey(), JSON.stringify(cart));
}

function addToCart(name, price, image) {
  if (!currentUser) {
    alert("Please login first");
    window.location.href = "login.html";
    return;
  }

  let cart = getCart();
  let item = cart.find((p) => p.name === name);

  if (item) {
    item.qty++;
  } else {
    cart.push({ name, price, image, qty: 1 });
  }

  saveCart(cart);
  alert("Added to cart");
}
