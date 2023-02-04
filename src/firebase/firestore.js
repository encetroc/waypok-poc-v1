import {
  getFirestore,
  collection,
  addDoc,
  writeBatch,
  doc,
  getDocs,
} from 'firebase/firestore'
import { app } from './initApp'

const db = getFirestore(app)

export const createVehicle = async (vehicle) => {
  try {
    const docRef = await addDoc(collection(db, 'vehicles'), vehicle)
    console.log('Document written with ID: ', docRef.id)
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}

export const createStops = async (vehicleId, stops) => {
  if (vehicleId === 1) return
  try {
    const batch = writeBatch(db)
    stops.forEach((stop) => {
      batch.set(doc(collection(db, `vehicles/${vehicleId}/stops`)), {
        address: stop.address,
        arrivalDateTime: new Date(stop.arrivalDateTime),
        departureDateTime: new Date(stop.departureDateTime),
      })
    })
    await batch.commit()
    console.log('stops created')
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}

export const getVehicles = async () => {
  const querySnapshot = await getDocs(collection(db, 'vehicles'))
  const vehicles = []
  querySnapshot.forEach((doc) => {
    vehicles.push(doc.id)
  })
  return vehicles
}
