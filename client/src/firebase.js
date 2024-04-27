import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCnBUzBwZv6WTHsy_Az06XmPl_5CizRlAA",
    authDomain: "quizz-46048.firebaseapp.com",
    databaseURL: "https://quizz-46048-default-rtdb.firebaseio.com",
    projectId: "quizz-46048",
    storageBucket: "quizz-46048.appspot.com",
    messagingSenderId: "339366796888",
    appId: "1:339366796888:web:c9608c55d4b795baeab42d",
    measurementId: "G-3TQT1B0CWL"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);