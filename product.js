const logo = document.querySelector(".logo");
const icon = document.querySelector(".icon");

logo.addEventListener("mouseover", () => {
  icon.style.color = "#EECAD5";
});

logo.addEventListener("mouseout", () => {
  icon.style.color = "#FF69B4";
});

// // ---------------------realtime database----------------------

// let cardContainer = document.getElementById("cardContainer");

// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
// import {
//   getDatabase,
//   ref,
//   set,
//   get,
// } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

// // تهيئة Firebase
// const firebaseConfig = {
//   apiKey: "AIzaSyAgyWGXCAIR6NiKfkzkWZbBeOMPRDNwMg4",
//   authDomain: "contactus-a9d19.firebaseapp.com",
//   databaseURL: "https://contactus-a9d19-default-rtdb.firebaseio.com",
//   projectId: "contactus-a9d19",
//   storageBucket: "contactus-a9d19.firebasestorage.app",
//   messagingSenderId: "290565306453",
//   appId: "1:290565306453:web:0995f78c2a17d582903cdc",
// };

// const app = initializeApp(firebaseConfig);
// const db = getDatabase(app);

// // دالة كتابة البيانات
// function writeUserData(userId, image, name, description, price, rating) {
//   set(ref(db, "products/" + userId), {
//     image: image,
//     name: name,
//     description: description,
//     price: price,
//     rating: rating,
//   })
//     .then(() => {
//       console.log("Data written successfully!");
//     })
//     .catch((error) => {
//       console.error("Error writing data:", error);
//     });
// }
// // كتابة بيانات
// // writeUserData(
// //   10,
// //   "https://images.uncommongoods.com/images/items/59000/59069_1_640px.webp",
// //   "Little Photographer Kids Digital Camera",
// //   "Give fledgling shutterbugs a real digital camera designed just for them, and discover the world through your child’s eyes.",
// //   52.11,
// //   4.5
// // );

// // دالة قراءة بيانات مستخدم معين
// function readUserData(userId) {
//   get(ref(db, "users/" + userId))
//     .then((snapshot) => {
//       if (snapshot.exists()) {
//         console.log("Data retrieved:", snapshot.val());
//       } else {
//         console.log("No data available");
//       }
//     })
//     .catch((error) => {
//       console.error("Error reading data:", error);
//     });
// }

// // دالة قراءة كل البيانات
// function getAllData() {
//   const dbRef = ref(db); // الإشارة إلى الجذر (root)
//   return get(dbRef)
//     .then((snapshot) => {
//       if (snapshot.exists()) {
//         return snapshot.val();
//       } else {
//         console.log("No data found!");
//         return null;
//       }
//     })
//     .catch((error) => {
//       console.error("Error retrieving data:", error);
//       throw error;
//     });
// }

// // قراءة بيانات مستخدم معين
// // readUserData(1);

// // قراءة كل البيانات
// getAllData().then((data) => {
//   if (data && data.products) {
//     for (let userId in data.products) {
//       let dataItem = document.createElement("div");
//       // dataItem.classList.add("card");
//       dataItem.innerHTML = `
//       <div id="cardItem" class="card">
//       <div class="col">
//         <div class="card h-100">
//           <img id="imgCard" src="${data.products[userId].image}" class=" card-img-top" alt="Bella Doll">
//           <div id="textCardContainer" class="card-body text-center">
//             <h5 class="card-title">${data.products[userId].name}</h5>
//             <p class="card-text">${data.products[userId].description}</p>
//             <div class="d-flex justify-content-between">
//               <span class="fw-bold">$${data.products[userId].price}</span>
//               <span class="text-warning">&#9733;${data.products[userId].rating}</span>
//             </div>
//             <div>
//             <button id="detailsButton" class="m-1 btn btn-pink" style="background-color: #f8d7da; color: #000;">More Details</button>
//             <button id="detailsButton" class="btn btn-pink" style="background-color: #f8d7da; color: #000;">Add to favorite</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//       `;
//       cardContainer.appendChild(dataItem);
//     }
//   } else {
//     console.log("No users found!");
//   }
// });


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
let detailsArray = [];

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
    }
  } else {
    console.log("No users found!");
  }
});
let details = JSON.parse(localStorage.getItem("details") || []) 

function saveToStorage() {
  localStorage.setItem("details", JSON.stringify(detailsCard));
}

let detailsCard;
let names = [];
// دالة عرض التفاصيل

function displayDetails(product) {  
  // عرض بيانات المنتج المحدد
  detailsCard = {
    img : product.image,
    name: product.name,
    description: product.description,
    price: product.price,
    rating: product.rating
  };
  detailsArray.push(detailsCard)
  // console.log(detailsArray)
  saveToStorage()
  
}
names.push(details);
console.log(names)