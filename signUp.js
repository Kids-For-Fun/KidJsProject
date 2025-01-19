import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile, signInWithRedirect, getRedirectResult } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
// Import the functions you need from the SDKs you need
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
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
auth.languageCode = 'en';
let button = document.getElementById("authh");
let googleButton = document.getElementById("google-signin");
googleButton.addEventListener('click', () => {

    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
            const auth = getAuth();
            signInWithRedirect(auth, provider);

        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });

});


button.addEventListener('click', function (event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const terms = document.getElementById('terms').checked;



    const nameRegex = /^[A-Za-z\s]{3,30}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!nameRegex.test(name)) {
        alert('Please enter a valid name (3-30 characters).');
        return;
    }

    else if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    else if (!passwordRegex.test(password)) {
        alert('Password must be at least 8 characters long and include both letters, numbers and at least one special character.');
        return;
    }

    else if (!terms) {
        alert('You must agree to the terms and policy.');
        return;
    }
    else {
        let i = 5;
        alert('Form submitted successfully!');

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                // updateProfile(user, {
                //     displayName: name,
                // }).then(() => {
                //     console.log("user profile updated", name);
                // }).catch((error) => {
                //     console.error("error updating", error);
                // })
                localStorage.setItem("username", name);
                window.location.href = "index.html";
                alert("Creating the user account");





                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
                // ..
            });


    }
    onAuthStateChanged(auth, (user) => {
        const navUsername = document.getElementById('nav-username');
        if (user) {
            console.log("User is signed in:", user);

            // Save the user's display name to local storage
            // const displayName = user.displayName || "User";

            // Display the username in the navigation bar
            if (navUsername) {
                navUsername.textContent = `Welcome, ${displayName}`;
            }
        } else {
            console.log("No user is signed in.");

            // Clear the username from local storage
            // localStorage.removeItem("username");

            // Display a generic message
            if (navUsername) {
                navUsername.textContent = "Welcome, Guest";
            }
        }
    });





})

// export {
//     name
// };






//regix
function validateForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const terms = document.getElementById('terms').checked;



    const nameRegex = /^[A-Za-z\s]{3,30}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!nameRegex.test(name)) {
        alert('Please enter a valid name (3-30 characters).');
        return;
    }

    else if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    else if (!passwordRegex.test(password)) {
        alert('Password must be at least 8 characters long and include both letters, numbers and at least one special character.');
        return;
    }

    else if (!terms) {
        alert('You must agree to the terms and policy.');
        return;
    }
    else {
        alert('Form submitted successfully!');



    }

}