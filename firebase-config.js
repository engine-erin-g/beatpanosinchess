const firebaseConfig = {
    apiKey: "AIzaSyBC_HFtStnopiipUlwDv1Vy3ggaFSsknIg",
    authDomain: "beatpanos.firebaseapp.com",
    projectId: "beatpanos",
    storageBucket: "beatpanos.firebasestorage.app",
    messagingSenderId: "631721385857",
    appId: "1:631721385857:web:2490f86db5cf344b139280"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
