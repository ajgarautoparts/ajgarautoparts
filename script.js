/*const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar){
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}

if (close){
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}*/




/*=============== SHOW MENU ===============*/
const showMenu = (toggleId, navId) =>{
  const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId)

  if(toggle && nav){
    toggle.addEventListener('click', () =>{
      nav.classList.toggle('show-menu')
      toggle.classList.toggle('show-icon')
    })
  }
}
showMenu('nav-toggle','nav-menu')

/*=============== DROPDOWN MENU ===============*/
const dropdownItems = document.querySelectorAll('.dropdown__item')

dropdownItems.forEach((item) =>{
  const dropdownButton = item.querySelector('.dropdown__button')

  dropdownButton.addEventListener('click', () =>{
    const showDropdown = document.querySelector('.show-dropdown')
    toggleItem(item)

    if(showDropdown && showDropdown !== item){
      toggleItem(showDropdown)
    }
  })
})

const toggleItem = (item) =>{
  const dropdownContainer = item.querySelector('.dropdown__container')

  if(item.classList.contains('show-dropdown')){
    dropdownContainer.removeAttribute('style')
    item.classList.remove('show-dropdown')
  } else{
    dropdownContainer.style.height = dropdownContainer.scrollHeight + 'px'
    item.classList.add('show-dropdown')
  }
}

/*=============== RESET DROPDOWN ON DESKTOP ===============*/
const mediaQuery = matchMedia('(min-width: 1118px)')
const dropdownContainers = document.querySelectorAll('.dropdown__container')

const removeStyle = () =>{
  if(mediaQuery.matches){
    dropdownContainers.forEach(e => e.removeAttribute('style'))
    dropdownItems.forEach(e => e.classList.remove('show-dropdown'))
  }
}
window.addEventListener('resize', removeStyle)
 













var slideIndex = 1;
showSlides(slideIndex);
function plusSlides(n) {
    showSlides(slideIndex += n);
}
function currentSlide(n) {
    showSlides(slideIndex = n);
}
function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}
var slideIndex = 0;
showSlides();
function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
        for (i = 0; i < slides.length; i++) {
         slides[i].style.display = "none";
    }
      slideIndex++;
         if (slideIndex > slides.length) { slideIndex = 1 }
            slides[slideIndex - 1].style.display = "block";
            setTimeout(showSlides, 4000); // Change image every 4 seconds
}

















const initSlider = () => {
    const imageList = document.querySelector(".slider-wrapper .image-list");
    const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
    const sliderScrollbar = document.querySelector(".short-image-slider .slider-scrollbar");
    const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
    
    // Handle scrollbar thumb drag
    scrollbarThumb.addEventListener("mousedown", (e) => {
        const startX = e.clientX;
        const thumbPosition = scrollbarThumb.offsetLeft;
        const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;
        
        // Update thumb position on mouse move
        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;
            // Ensure the scrollbar thumb stays within bounds
            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;
            
            scrollbarThumb.style.left = `${boundedPosition}px`;
            imageList.scrollLeft = scrollPosition;
        }
        // Remove event listeners on mouse up
        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        }
        // Add event listeners for drag interaction
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    });
    // Slide images according to the slide button clicks
    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev-slide" ? -1 : 1;
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });
    });
     // Show or hide slide buttons based on scroll position
    const handleSlideButtons = () => {
        slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
        slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
    }
    // Update scrollbar thumb position based on image scroll
    const updateScrollThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`;
    }
    // Call these two functions when image list scrolls
    imageList.addEventListener("scroll", () => {
        updateScrollThumbPosition();
        handleSlideButtons();
    });
}
window.addEventListener("resize", initSlider);

window.addEventListener("load", initSlider);

<script>
/* ========= CART SYSTEM ========= */

// current user email (login হলে set হবে)
let currentUser = localStorage.getItem("loggedUser");

// cart key user wise
function getCartKey(){
  return currentUser ? "cart_" + currentUser : "cart_guest";
}

// get cart
function getCart(){
  return JSON.parse(localStorage.getItem(getCartKey())) || [];
}

// save cart
function saveCart(cart){
  localStorage.setItem(getCartKey(), JSON.stringify(cart));
}

// add to cart
function addToCart(name, price, image){
  if(!currentUser){
    alert("Please login to add product to cart");
    window.location.href = "login.html";
    return;
  }

  let cart = getCart();

  let existing = cart.find(p => p.name === name);
  if(existing){
    existing.qty += 1;
  }else{
    cart.push({name, price, image, qty:1});
  }

  saveCart(cart);
  alert("Product added to cart");
}
</script>


