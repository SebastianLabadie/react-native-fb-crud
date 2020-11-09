import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDjxk5NGXPCAd12EqntN2jZ2xLqxZOAXo8",
    authDomain: "rn-fcrud.firebaseapp.com",
    databaseURL: "https://rn-fcrud.firebaseio.com",
    projectId: "rn-fcrud",
    storageBucket: "rn-fcrud.appspot.com",
    messagingSenderId: "880064822265",
    appId: "1:880064822265:web:a679cb2133128e792cdb28"
  };

firebase.initializeApp(firebaseConfig)

const db= firebase.firestore()

export {firebase,db}