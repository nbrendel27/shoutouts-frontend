// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUm8y7lGJw8N7t25JK5i6XjMo8KHug1p8",
  authDomain: "shout-outs-45a8b.firebaseapp.com",
  projectId: "shout-outs-45a8b",
  storageBucket: "shout-outs-45a8b.appspot.com",
  messagingSenderId: "427955179086",
  appId: "1:427955179086:web:da4ebddd38a6ff6964fd1f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

const authProvider = new GoogleAuthProvider()

export function signInWithGoogle():void {
    signInWithPopup(auth, authProvider)
}

export function signOutOfGoogle(): void {
    auth.signOut();
}