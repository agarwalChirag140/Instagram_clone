import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyD2n_vVa-dkiGKdq6RoCwWn5dgOSWWDnKc",
    authDomain: "instagram-clone-de381.firebaseapp.com",
    projectId: "instagram-clone-de381",
    storageBucket: "instagram-clone-de381.appspot.com",
    messagingSenderId: "947153733694",
    appId: "1:947153733694:web:0b162ce36195b0165da96f",
    measurementId: "G-X19BGFNRWX"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
export const db = firebaseApp.firestore()
export const auth = firebase.auth()
export const storage = firebase.storage()