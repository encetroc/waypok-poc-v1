import { getFirestore } from 'firebase/firestore'
import { collection, addDoc } from 'firebase/firestore'
import { app } from './initApp'

const db = getFirestore(app)

export const createVehicle = async () => {
  try {
    const docRef = await addDoc(collection(db, 'users'), {
      first: 'Ada',
      last: 'Lovelace',
      born: 1815,
    })
    console.log('Document written with ID: ', docRef.id)
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}
