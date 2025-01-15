// Import Firebase functions
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

// Konfiguracja Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDrtdS3X4BLbcWUP4_EJXqm6i7LXAkHnDQ",
    authDomain: "tf-ai-bb045.firebaseapp.com",
    projectId: "tf-ai-bb045",
    storageBucket: "tf-ai-bb045.appspot.com",
    messagingSenderId: "456421103836",
    appId: "1:456421103836:web:178916aefb845d9d3f3c19",
    measurementId: "G-Q2RB0234NL"
};

// Inicjalizacja Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

// Rejestracja użytkownika
document.getElementById('register-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            alert('Rejestracja udana! Zaloguj się.');
            window.location.href = 'index.html';
        })
        .catch((error) => alert(error.message));
});

// Logowanie użytkownika
document.getElementById('login-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            window.location.href = 'chat.html';
        })
        .catch((error) => alert(error.message));
});

// Wylogowanie użytkownika
document.getElementById('logout')?.addEventListener('click', () => {
    signOut(auth)
        .then(() => {
            alert('Wylogowano.');
            window.location.href = 'index.html';
        })
        .catch((error) => alert(error.message));
});

// Obsługa czatu
document.getElementById('chat-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = document.getElementById('message').value;
    const chatBox = document.getElementById('chat-box');

    chatBox.innerHTML += `<p><strong>Ty:</strong> ${message}</p>`;
    document.getElementById('message').value = '';

    // Tu wstaw logikę wysyłania wiadomości do AI
    chatBox.innerHTML += `<p><strong>AI:</strong> Przepraszam, ale nie rozumiem jeszcze tego pytania.</p>`;
});
