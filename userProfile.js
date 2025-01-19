// hover logo navbar
const logo = document.querySelector('.logo');
const icon = document.querySelector('.icon');

logo.addEventListener('mouseover', () => {
  icon.style.color = '#EECAD5';
});

logo.addEventListener('mouseout', () => {
  icon.style.color = '#FF69B4';
});


// firebase==================
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  updateProfile,
  updateEmail,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAgyWGXCAIR6NiKfkzkWZbBeOMPRDNwMg4",
  authDomain: "contactus-a9d19.firebaseapp.com",
  projectId: "contactus-a9d19",
  storageBucket: "contactus-a9d19.appspot.com",
  messagingSenderId: "290565306453",
  appId: "1:290565306453:web:0995f78c2a17d582903cdc",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// Main ======================

const edit_emailBtn = document.getElementById('edit_email');
const edit_nameBtn = document.getElementById('edit_name');
const edit_passwordBtn = document.getElementById('edit_password');

const editNameForm = document.getElementById('edit-box-name');
const editEmailForm = document.getElementById('edit-box-email');
const editPasswordForm = document.getElementById('edit-box-password');

const deleteNameBtn = document.querySelector('.delet_name_btn');
const deleteEmailBtn = document.querySelector('.delet_email_btn');

const showName = document.getElementById('showName');
const showEmail = document.getElementById('showEmail');

// ================= for editing ============
edit_nameBtn.addEventListener('click', () => {
  editEmailForm.style.display = 'none';
  editPasswordForm.style.display = 'none';
  editNameForm.style.display = editNameForm.style.display === 'none' ? 'block' : 'none';
});

edit_emailBtn.addEventListener('click', () => {
  editNameForm.style.display = 'none';
  editPasswordForm.style.display = 'none';
  editEmailForm.style.display = editEmailForm.style.display === 'none' ? 'block' : 'none';
});

edit_passwordBtn.addEventListener('click', () => {
  editNameForm.style.display = 'none';
  editEmailForm.style.display = 'none';
  editPasswordForm.style.display = editPasswordForm.style.display === 'none' ? 'block' : 'none';
});

document.addEventListener("DOMContentLoaded", () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      document.getElementById("showName").textContent = user.displayName || "No Name";
      document.getElementById("showEmail").textContent = user.email;
    } else {
      console.log("Please log in to edit your profile.");
    }
  });
});



document.getElementById("edit_name").addEventListener("click", () => {
  const newName = document.getElementById("newName").value;

  updateProfile(auth.currentUser, {
    displayName: newName,
  })
    .then(() => {
      console.log("Name updated successfully!");
      document.getElementById("showName").textContent = newName;
    })
    .catch((error) => {
      console.error("Error updating name:", error);
      alert("Failed to update name.");
    });
});



document.getElementById("edit_email").addEventListener("click", () => {
  const newEmail = document.getElementById("newEmail").value;

  updateEmail(auth.currentUser, newEmail)
    .then(() => {
      console.log("Email updated successfully!");
      document.getElementById("showEmail").textContent = newEmail;
    })
    .catch((error) => {
      console.error("Error updating email:", error);
      alert("Failed to update email.");
    });
});


document.getElementById("edit_password").addEventListener("click", (event) => {
  event.preventDefault();

  const oldPassword = document.getElementById("old_Password").value;
  const newPassword = document.getElementById("newPassword").value;
  const confirmPassword = document.getElementById("newPasswordConfirm").value;

  document.getElementById("newPassword").classList.remove("error");
  document.getElementById("newPasswordConfirm").classList.remove("error");

  if (newPassword !== confirmPassword) {
    document.getElementById("newPassword").classList.add("error");
    document.getElementById("newPasswordConfirm").classList.add("error");

    document.getElementById("error-message").style.display = "block"; // إظهار الرسالة
    return;
  }

  updatePassword(auth.currentUser, newPassword)
    .then(() => {
      document.getElementById("error-message").style.display = "none";
      console.log("Password updated successfully!");
    })
    .catch((error) => {
      document.getElementById("error-message").style.display = "none";
      console.error("Error updating password:", error);
      alert("Failed to update password.");
    });
});
