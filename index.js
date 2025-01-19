import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getDatabase, ref, child, get, set, update, remove, onValue } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";
const logo = document.querySelector('.logo');
const icon = document.querySelector('.icon');

logo.addEventListener('mouseover', () => {
    icon.style.color = '#EECAD5';
});

logo.addEventListener('mouseout', () => {
    icon.style.color = '#FF69B4';
});





// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAgyWGXCAIR6NiKfkzkWZbBeOMPRDNwMg4",
    authDomain: "contactus-a9d19.firebaseapp.com",
    databaseURL: "https://contactus-a9d19-default-rtdb.firebaseio.com",
    projectId: "contactus-a9d19",
    storageBucket: "contactus-a9d19.firebasestorage.app",
    messagingSenderId: "290565306453",
    appId: "1:290565306453:web:0995f78c2a17d582903cdc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
// const starCountRef = ref(db, 'products/' + productId + '/starCount');
//     onValue(starCountRef, (snapshot) => {
//         const data = snapshot.val();
//         updateStarCount(postElement, data);
//     });

const dbRef = ref(getDatabase());
get(child(dbRef, `products/`)).then((snapshot) => {
    let data = snapshot.val();

    if (snapshot.exists()) {
        // console.log(data);
        data.slice(0, 5).map((data) => {

            document.getElementById("new-products").innerHTML += `
                           <div id="cardItem" class="card">
      <div class="col">
        <div class="card h-100">
          <img id="imgCard" src="${data.image}" class=" card-img-top" alt="Bella Doll">
          <div id="textCardContainer" class="card-body text-center">
            <h5 class="card-title">${data.name}</h5>
            <p class="card-text">${data.description}</p>
            <div class="d-flex justify-content-between">
              <span class="fw-bold">$${data.price}</span>
              <span class="text-warning">&#9733;${data.rating}</span>
            </div>
            <button id="detailsButton" class="btn btn-pink" style="background-color: #f8d7da; color: #000;">More Details</button>
          </div>
        </div>
      </div>
    </div>`

        });
        data.slice(5, 9).map((d) => {

            document.getElementById("offers-products").innerHTML += `
                          <div id="cardItem" class="card">
      <div class="col">
        <div class="card h-100">
          <img id="imgCard" src="${d.image}" class=" card-img-top" alt="Bella Doll">
          <div id="textCardContainer" class="card-body text-center">
            <h5 class="card-title">${d.name}</h5>
            <p class="card-text">${d.description}</p>
            <div class="d-flex justify-content-between">
              <span class="fw-bold">$${d.price}</span>
              <span class="text-warning">&#9733;${d.rating}</span>
            </div>
            <button id="detailsButton" class="btn btn-pink" style="background-color: #f8d7da; color: #000;" onclick="viewProduct(${d.name})">More Details</button>
          </div>
        </div>
      </div>
    </div>`
        });
    } else {
        console.log("No data available");
    }

}).catch((error) => {
    console.error(error);
});


// function retData(){
//     const dbRef=ref(db);
//     get(child(dbRef,'products/'+CnicInp.value)).then((snapshot)=>{

//         if(snapshot.exists()){
//             let name= snapshot.val().

//         }
//     })

// }
// function search_animal() {
//     document.getElementById("list").style.display = "block";
//     let input = document.getElementById('searchbar').value
//     input = input.toLowerCase();
//     let x = document.getElementsByClassName('animals');

//     for (i = 0; i < x.length; i++) {
//         if (!x[i].innerHTML.toLowerCase().includes(input)) {
//             x[i].style.display = "none";
//         }
//         else {
//             x[i].style.display = "list-item";
//         }
//     }
// }
let username = localStorage.getItem("username");
document.getElementById("nav-username").textContent = username;
document.getElementById("nav-username").style.margin = "10px";

