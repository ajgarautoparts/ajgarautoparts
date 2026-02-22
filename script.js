/* ===== MOBILE MENU ===== */
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("show-menu");
      navToggle.classList.toggle("show-icon");
    });
  }

  /* ===== DROPDOWN ===== */
  const dropdownItems = document.querySelectorAll(".dropdown__item");

  dropdownItems.forEach(item => {
    const button = item.querySelector(".dropdown__button");
    if (button) {
      button.addEventListener("click", () => {
        item.classList.toggle("show-dropdown");
      });
    }
  });
});
