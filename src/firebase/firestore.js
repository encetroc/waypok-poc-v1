import {
  getFirestore,
  collection,
  addDoc,
  writeBatch,
  doc,
  getDocs,
  onSnapshot,
  deleteDoc,
  getDoc,
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

export const getShipmentFromRef = async (shipmentRef) => {
  const shipment = await getDoc(shipmentRef)
  return { id: shipment.id, ...shipment.data() }
}

export const getStopOperations = async (stopId, vehicleId) => {
  const querySnapshot = await getDocs(
    collection(db, `vehicles/${vehicleId}/stops/${stopId}/stopOperations`)
  )
  const operations = []
  querySnapshot.forEach((doc) => {
    operations.push({ id: doc.id, ...doc.data() })
  })
  operations.map(async (operation) => {
    const shipment = await getShipmentFromRef(operation.shipmentDoc)
    operation.shipment = shipment
  })
  return operations
}

export const getStops = async (vehicleId) => {
  const querySnapshot = await getDocs(
    collection(db, `vehicles/${vehicleId}/stops`)
  )
  const stops = []
  querySnapshot.forEach((doc) => {
    stops.push({ id: doc.id, ...doc.data() })
  })
  stops.map(async (stop) => {
    const operations = await getStopOperations(stop.id, vehicleId)
    stop.operations = operations
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

export const getStopFromRef = async (stopRef) => {
  const stop = await getDoc(stopRef)
  return { id: stop.id, ...stop.data() }
}

const getShipmentOperations = async (shipmentId) => {
  const querySnapshot = await getDocs(
    collection(db, `shipments/${shipmentId}/shipmentOperations`)
  )
  const operations = []
  querySnapshot.forEach((doc) => {
    operations.push({ id: doc.id, ...doc.data() })
  })
  operations.map(async (operation) => {
    const stop = await getStopFromRef(operation.stopDoc)
    operation.stop = stop
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
    const operations = await getShipmentOperations(shipment.id)
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

const makeStopOpreation = (stopId, shipmentId, operation) => [
  stopId,
  {
    shipmentDoc: doc(db, `shipments/${shipmentId}`),
    isCompleted: false,
    operation,
  },
]

const makeShipmentOpreation = (stopId, vehicleId, operation) => ({
  stopDoc: doc(db, `vehicles/${vehicleId}/stops`, stopId),
  vehicleDoc: doc(db, `vehicles/${vehicleId}`),
  isCompleted: false,
  operation,
})

export const bookTrip = async (vehicleId, shipmentId, stopIds) => {
  let shipmentOperations = stopIds.map((stopId, i) => {
    if (i === 0) return makeShipmentOpreation(stopId, vehicleId, 'pickup')
    return makeShipmentOpreation(stopId, vehicleId, 'dropoff')
  })
  const shipmentOperationsRefs = shipmentOperations.map((op) =>
    doc(collection(db, `shipments/${shipmentId}/shipmentOperations`))
  )

  let stopOperations = stopIds.map((stopId, i) => {
    if (i === 0) return makeStopOpreation(stopId, shipmentId, 'pickup')
    return makeStopOpreation(stopId, shipmentId, 'dropoff')
  })
  const stopOperationsRefs = stopOperations.map((op) =>
    doc(collection(db, `vehicles/${vehicleId}/stops/${op[0]}/stopOperations`))
  )

  shipmentOperations = shipmentOperations.map((op, i) => ({
    ...op,
    stopOperationsRefs: stopOperationsRefs[i],
  }))
  stopOperations = stopOperations.map((op, i) => [
    op[0],
    {
      ...op[1],
      shipmentOperationsRefs: shipmentOperationsRefs[i],
    },
  ])

  try {
    const batch = writeBatch(db)
    shipmentOperations.forEach((op, i) => {
      batch.set(shipmentOperationsRefs[i], op)
    })
    stopOperations.forEach((op, i) => {
      batch.set(stopOperationsRefs[i], op[1])
    })
    await batch.commit()
    console.log('stops created for shipment', shipmentId)
    return true
  } catch (e) {
    console.error('Error adding document: ', e)
    return false
  }
}

export const cancelShipmentOperation = async (shipmentId, operations) => {
  try {
    const batch = writeBatch(db)
    operations.forEach((op) => {
      batch.delete(doc(db, `shipments/${shipmentId}/shipmentOperations`, op.id))
      batch.delete(op.stopOperationsRefs)
    })
    await batch.commit()
    console.log('shipment operations cancelled', shipmentId)
    return true
  } catch (e) {
    console.error('Error deleting documents: ', e)
    return false
  }
}

export const completeOperation = async (
  stopOperationPath,
  shipmentOperationRef
) => {
  const batch = writeBatch(db)
  batch.update(doc(db, stopOperationPath), {
    isCompleted: true,
  })
  batch.update(shipmentOperationRef, { isCompleted: true })
  await batch.commit()
  console.log('operation completed')
}
