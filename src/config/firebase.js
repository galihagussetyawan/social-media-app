import { initializeApp } from "firebase/app";
import { getFirestore, } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { currentUser } from "../stores/auth.store";

const firebaseConfig = {
    apiKey: "AIzaSyAx2ymRIJhT8usXM6w1gsh7YjV3oNAgo20",
    authDomain: "astro-firebase-1fac6.firebaseapp.com",
    projectId: "astro-firebase-1fac6",
    storageBucket: "astro-firebase-1fac6.appspot.com",
    messagingSenderId: "776775516596",
    appId: "1:776775516596:web:bf2891ad51939a954332e1",
    measurementId: "G-LJ0LFS83L8"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
    if (user) {
        currentUser.set(user);
    } else {
        currentUser.set(null);
    }
});