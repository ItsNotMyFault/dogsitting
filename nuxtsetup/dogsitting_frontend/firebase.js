// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDtzCqzRYb_WdTaC265-M6javglefwfcso',
  authDomain: 'dogsitting-1d358.firebaseapp.com',
  projectId: 'dogsitting-1d358',
  storageBucket: 'dogsitting-1d358.appspot.com',
  messagingSenderId: '307695480234',
  appId: '1:307695480234:web:18bf63023e4189be6ccfd3',
  measurementId: 'G-FGM19L9DSN'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
export default analytics
