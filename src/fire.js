import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyB7UrEkJ59vPD8FZxvhGkRuUnDytupkcpo',
  authDomain: 'keyboard-c4281.firebaseapp.com',
  projectId: 'keyboard-c4281',
  storageBucket: 'keyboard-c4281.appspot.com',
  messagingSenderId: '34057492729',
  appId: '1:34057492729:web:781dc6873c142593806a28',
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore()
