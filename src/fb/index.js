import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: 'AIzaSyCx4rSDCrwja-YSSatXiUMN1Op9vag8IUg',
    authDomain: 'app-marvel-4b2dc.firebaseapp.com',
    databaseURL: 'https://app-marvel-4b2dc.firebaseio.com',
    projectId: 'app-marvel-4b2dc',
    storageBucket: 'app-marvel-4b2dc.appspot.com',
    messagingSenderId: '1011349489015',
    appId: '1:1011349489015:web:984ab2354087e2e8e60d72'
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore()
const auth = firebase.auth()

// collection references
const usersCollection = db.collection('users')
const likesCollection = db.collection('likes')

// export utils/refs
export {
  db,
  auth,
  usersCollection,
  likesCollection
}