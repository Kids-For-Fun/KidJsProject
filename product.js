const logo = document.querySelector(".logo");
const icon = document.querySelector(".icon");

logo.addEventListener("mouseover", () => {
  icon.style.color = "#EECAD5";
});

logo.addEventListener("mouseout", () => {
  icon.style.color = "#FF69B4";
});

// // ---------------------realtime database----------------------

// استدعاء بيانات Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

// تهيئة Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAgyWGXCAIR6NiKfkzkWZbBeOMPRDNwMg4",
  authDomain: "contactus-a9d19.firebaseapp.com",
  databaseURL: "https://contactus-a9d19-default-rtdb.firebaseio.com",
  projectId: "contactus-a9d19",
  storageBucket: "contactus-a9d19.firebasestorage.app",
  messagingSenderId: "290565306453",
  appId: "1:290565306453:web:0995f78c2a17d582903cdc",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// المتغيرات
let cardContainer = document.getElementById("cardContainer");

// قراءة البيانات من Firebase
function getAllData() {
  const dbRef = ref(db); // الإشارة إلى الجذر (root)
  return get(dbRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("No data found!");
        return null;
      }
    })
    .catch((error) => {
      console.error("Error retrieving data:", error);
      throw error;
    });
}

// عرض بيانات المنتجات
getAllData().then((data) => {
  if (data && data.products) {
    for (let userId in data.products) {
      let product = data.products[userId];
      let dataItem = document.createElement("div");
      dataItem.innerHTML = `
      <div id="cardItem" class="card">
        <div class="col">
          <div class="card h-100">
            <img id="imgCard" src="${product.image}" class="card-img-top" alt="Product Image">
            <div id="textCardContainer" class="card-body text-center">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">${product.description}</p>
              <div class="d-flex justify-content-between">
                <span class="fw-bold">$${product.price}</span>
                <span class="text-warning">&#9733;${product.rating}</span>
              </div>
              <div>
                <button id="detailsButton" class="m-1 btn btn-pink" style="background-color: #f8d7da; color: #000;" data-id="${userId}">More Details</button>
                <button id="favoriteButton" class="btn btn-pink" style="background-color: #f8d7da; color: #000;">Add to favorite</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      `;
      cardContainer.appendChild(dataItem);

      // إضافة حدث للزر "More Details"
      dataItem.querySelector("#detailsButton").addEventListener("click", () => {
        displayDetails(product);
      });

      // إضافة حدث للزر "Add to favorite"
      dataItem
        .querySelector("#favoriteButton")
        .addEventListener("click", () => {
          addToFavorites(product);
        });
    }
  } else {
    console.log("No users found!");
  }
});

// add To Favorites
function addToFavorites(product) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  favorites.push(product);

  localStorage.setItem("favorites", JSON.stringify(favorites));
}

// Product Details
let displayDetails = function (product) {
  console.log(product);
  localStorage.setItem("details", JSON.stringify(product));
};
let username = localStorage.getItem("username");
document.getElementById("nav-username").textContent = username;
document.getElementById("nav-username").style.margin = "10px";