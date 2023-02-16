import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyBbLchlN7fFjpXzJydITFnBaSQ5YovCf0o',
  authDomain: 'waypok-prototype.firebaseapp.com',
  projectId: 'waypok-prototype',
  storageBucket: 'waypok-prototype.appspot.com',
  messagingSenderId: '349305601171',
  appId: '1:349305601171:web:495496a4e478a2361c6166',
}

export const app = initializeApp(firebaseConfig)
