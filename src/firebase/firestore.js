import {
  getFirestore,
  collection,
  addDoc,
  writeBatch,
  doc,
  getDocs,
  onSnapshot,
  deleteDoc,
} from 'firebase/firestore'
import { app } from './initApp'

export const db = getFirestore(app)

export const createStop = async (vehicleId, stop) => {
  try {
    const docRef = await addDoc(
      collection(db, `vehicles/${vehicleId}/stops`),
      stop
    )
    console.log('Document written with ID: ', docRef.id)
    return true
  } catch (e) {
    console.error('Error adding document: ', e)
    return false
  }
}

export const createVehicle = async (vehicle) => {
  try {
    const docRef = await addDoc(collection(db, 'vehicles'), vehicle)
    console.log('Document written with ID: ', docRef.id)
    return true
  } catch (e) {
    console.error('Error adding document: ', e)
    return false
  }
}

export const createShipment = async (shipment) => {
  try {
    const docRef = await addDoc(collection(db, 'shipments'), shipment)
    console.log('Document written with ID: ', docRef.id)
    return true
  } catch (e) {
    console.error('Error adding document: ', e)
    return false
  }
}

//TODO: delete
export const createStops = async (vehicleId, stops) => {
  if (vehicleId === '') return
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
    console.log('stops created for vehicle', vehicleId)
    return true
  } catch (e) {
    console.error('Error adding document: ', e)
    return false
  }
}

export const getStops = async (vehicleId) => {
  const querySnapshot = await getDocs(
    collection(db, `vehicles/${vehicleId}/stops`)
  )
  const stops = []
  querySnapshot.forEach((doc) => {
    stops.push({ id: doc.id, ...doc.data() })
  })
  return stops
}

export const getVehicles = async () => {
  const querySnapshot = await getDocs(collection(db, 'vehicles'))
  const vehicles = []
  querySnapshot.forEach(async (doc) => {
    vehicles.push({ id: doc.id, ...doc.data(), stops: [] })
  })
  vehicles.map(async (vehicle) => {
    const stops = (await getStops(vehicle.id)).sort(
      (a, b) => a.arrivalDateTime - b.arrivalDateTime
    )
    vehicle.stops = stops
  })
  return vehicles
}

const getOperations = async (shipmentId) => {
  const querySnapshot = await getDocs(
    collection(db, `shipments/${shipmentId}/operations`)
  )
  const operations = []
  querySnapshot.forEach((doc) => {
    operations.push({ id: doc.id, ...doc.data() })
  })
  return operations
}

export const getShipments = async () => {
  const querySnapshot = await getDocs(collection(db, 'shipments'))
  const shipments = []
  querySnapshot.forEach((doc) => {
    shipments.push({ id: doc.id, ...doc.data() })
  })
  shipments.map(async (shipment) => {
    const operations = await getOperations(shipment.id)
    shipment.operations = operations
  })
  return shipments
}

export const deleteVehicle = async (vehicleId) => {
  try {
    await deleteDoc(doc(db, 'vehicles', vehicleId))
    console.log('Document successfully deleted!')
    return true
  } catch (e) {
    console.error('Error removing document: ', e)
    return false
  }
}

export const deleteShipment = async (shipmentId) => {
  try {
    await deleteDoc(doc(db, 'shipments', shipmentId))
    console.log('Document successfully deleted!')
    return true
  } catch (e) {
    console.error('Error removing document: ', e)
    return false
  }
}

export const deleteStop = async (vehicleId, stopId) => {
  try {
    await deleteDoc(doc(db, `vehicles/${vehicleId}/stops`, stopId))
    console.log('Document successfully deleted!')
    return true
  } catch (e) {
    console.error('Error removing document: ', e)
    return false
  }
}

const makeTrip = (stopId, vehicleId, time, operation) => {
  return {
    stopId,
    arrivalDateTime: time,
    isDone: false,
    operation,
    vehicleId,
  }
}

const makeShipmentInStop = (shipmentId, time, operation) => {
  return {
    shipmentId,
    arrivalDateTime: time,
    isDone: false,
    operation,
  }
}

export const bookTrip = async (vehicleId, shipmentId, stops) => {
  const operations = stops.map((stop, i) => {
    if (i === 0)
      return makeTrip(stop.id, vehicleId, stop.departureDateTime, 'pickup')
    if (i === stops.length - 1)
      return makeTrip(stop.id, vehicleId, stop.arrivalDateTime, 'dropoff')
    return [
      makeTrip(stop.id, vehicleId, stop.arrivalDateTime, 'dropoff'),
      makeTrip(stop.id, vehicleId, stop.departureDateTime, 'pickup'),
    ]
  })

  try {
    const batch = writeBatch(db)

    stops.forEach((stop, i) => {
      if (i === 0)
        batch.set(
          doc(
            collection(db, `vehicles/${vehicleId}/stops/${stop.id}/shipments`)
          ),
          makeShipmentInStop(shipmentId, stop.departureDateTime, 'pickup')
        )
      else if (i === stops.length - 1)
        batch.set(
          doc(
            collection(db, `vehicles/${vehicleId}/stops/${stop.id}/shipments`)
          ),
          makeShipmentInStop(shipmentId, stop.arrivalDateTime, 'dropoff')
        )
      else {
        batch.set(
          doc(
            collection(db, `vehicles/${vehicleId}/stops/${stop.id}/shipments`)
          ),
          makeShipmentInStop(shipmentId, stop.arrivalDateTime, 'dropoff')
        )
        batch.set(
          doc(
            collection(db, `vehicles/${vehicleId}/stops/${stop.id}/shipments`)
          ),
          makeShipmentInStop(shipmentId, stop.departureDateTime, 'pickup')
        )
      }
    })

    operations.flat().forEach((stop) => {
      batch.set(doc(collection(db, `shipments/${shipmentId}/operations`)), stop)
    })
    await batch.commit()
    console.log('stops created for shipment', shipmentId)
    return true
  } catch (e) {
    console.error('Error adding document: ', e)
    return false
  }
}
