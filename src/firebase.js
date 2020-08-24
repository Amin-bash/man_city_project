import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBYt4INaLp-BaTTGMAex2juDqIuQfZpUnw",
  authDomain: "m-city-2a2d2.firebaseapp.com",
  databaseURL: "https://m-city-2a2d2.firebaseio.com",
  projectId: "m-city-2a2d2",
  storageBucket: "m-city-2a2d2.appspot.com",
  messagingSenderId: "63063801982",
  appId: "1:63063801982:web:d1ea45d192cbd51fab582f",
  measurementId: "G-1L311VFJ1Z"
};
firebase.initializeApp(firebaseConfig);

const firebaseDB = firebase.database();
const firebaseMatches = firebaseDB.ref('matches');
const firebasePromotions = firebaseDB.ref('promotions');
const firebaseTeams = firebaseDB.ref('teams');
const firebasePlayers = firebaseDB.ref('players');



export {
  firebase,
  firebaseMatches,
  firebasePromotions,
  firebaseTeams,
  firebaseDB,
  firebasePlayers
}