import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import firebase from "firebase/compat";
import { loadFonts } from './plugins/webfontloader'
import VueTheMask from 'vue-the-mask';
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';


const firebaseConfig = {
    apiKey: "AIzaSyB4CLE-K00jXZHQC2lMentBnUbvDBe6ITE",
    authDomain: "plataforma-homolog.firebaseapp.com",
    projectId: "plataforma-homolog",
    storageBucket: "plataforma-homolog.appspot.com",
    messagingSenderId: "317717419306",
    appId: "1:317717419306:web:89abaed50aa9eac040fa53",
    measurementId: "G-HF69LY0HS3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
firebase.initializeApp(firebaseConfig);

window.db = db
window.app = app


loadFonts()

createApp(App)
    .use(VueTheMask)
    .use(router)
    .use(vuetify)
    .mount('#app')
