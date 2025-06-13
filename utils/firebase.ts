// utils/firebase.ts
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCfKrAZYBzkTpPUSNlh60QWlYj_a2gYMqg",
    authDomain: "hotel-booking-87a15.firebaseapp.com",
    projectId: "hotel-booking-87a15",
    storageBucket: "hotel-booking-87a15.firebasestorage.app",
    messagingSenderId: "1002309023835",
    appId: "1:1002309023835:web:7305b80a1ea65ad5bbe77e",
    measurementId: "G-6QH8PWYFH8",
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }
