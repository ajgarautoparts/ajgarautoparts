import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCvJ1h4CYZFr9h20O5zaxN6eoJtsQQypqs",
  authDomain: "ajgar-auto-parts.firebaseapp.com",
  projectId: "ajgar-auto-parts"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const box = document.getElementById("products");

if (!box) {
  console.warn("Products container not found");
}

const q = query(
  collection(db, "products"),
  where("status", "==", "active")
);

const snap = await getDocs(q);

if (snap.empty && box) {
  box.innerHTML = "<p>No products found</p>";
}

snap.forEach(doc => {
  const p = doc.data();

  box.innerHTML += `
    <div class="pro product-card"
      data-name="${p.name}"
      data-price="${p.offerPrice ?? p.price}"
      data-image="${p.image}">
      
      <img src="${p.image}">
      <div class="des">
        <h5>${p.name}</h5>
        <h4>₹${p.offerPrice ?? p.price}</h4>
      </div>

      <a href="product.html?id=${doc.id}">
        <i class="fas fa-arrow-right cart"></i>
      </a>
    </div>
  `;
});
