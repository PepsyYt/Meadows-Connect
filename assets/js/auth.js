// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { getFirestore, setDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB3tfAA2Ly5ZJBHML8FaH5GpeA1tSoTXiY",
    authDomain: "login-register-society.firebaseapp.com",
    projectId: "login-register-society",
    storageBucket: "login-register-society.appspot.com",
    messagingSenderId: "208986787254",
    appId: "1:208986787254:web:6380e43b5da94f1dfc4517",
    measurementId: "G-6QCFCHNQWB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(); // Initialize auth
const db = getFirestore(app); // Initialize Firestore


// Function to show message when registered or logged in
function showMessage(message, divId) {
    var messageDiv = document.getElementById(divId);
    messageDiv.style.display = 'block';
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(() => {
        messageDiv.style.opacity = 0;
    }, 5000);
}

// // logout function
// function logout() {
//     auth.signOut().then(() => {
//         localStorage.removeItem('loggedInUserId');
//         window.location.href = 'index.html';
//     }).catch((error) => {
//         console.log(error);
//     });
// }


// // Function to handle UI changes based on authentication status
// function updateUI(user) {
//     const logRegElement = document.getElementById('log-reg-txt');
//     // const user = auth.currentUser;
//     if (user) {
//         // User is signed in, hide the login/register link
//         logRegElement.style.display = 'none';
//     } else {
//         // User is not signed in, show the login/register link
//         logRegElement.style.display = 'block';
//     }
// }

// // Listen for authentication state changes
// onAuthStateChanged(auth, (user) => {
//     updateUI(user);
// });


// Function to sign up the user with username, email, and password
const signUp = document.getElementById('submit-signUp-email');
signUp.addEventListener('click', async (event) => {
    event.preventDefault();

    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userData = {
                username: username,
                email: email
            };
            showMessage('User Created', 'signUp-Message');
            const docRef = doc(db, "users", user.uid);
            return setDoc(docRef, userData);
        })
        .then(() => {
            window.location.href = 'index.html';
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === 'auth/email-already-in-use') {
                showMessage('Email already exists', 'signUp-Message');
            } else {
                showMessage('Unable to create user', 'signUp-Message');
            }
        });
});

// Function to sign in the user with email and password
const signIn = document.getElementById('submit-signIn-email');
signIn.addEventListener('click', async (event) => {
    event.preventDefault();

    const email = document.getElementById('signIn-email').value;
    const password = document.getElementById('signIn-password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            showMessage('User Logged In', 'signIn-Message');
            const user = userCredential.user;
            localStorage.setItem('loggedInUserId', user.uid);
            window.location.href = 'home.html';
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === 'auth/invalid-credential') {
                showMessage('Incorrect Email or Password', 'signIn-Message');
            } else {
                showMessage('Account does not exist', 'signIn-Message');
            }
        });
});
