import { createContext, useState, useEffect, useContext } from 'react'

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

import { getVehicles, getShipments, getStops } from '@/firebase/firestore'

const Store = createContext()
export const useStore = () => useContext(Store)

export const StoreContext = ({ children }) => {
  const [vehicles, setVehicles] = useState([])
  const [shipments, setShipments] = useState([])

  const refreshVehicles = () => {
    getVehicles().then(setVehicles)
  }

  const refreshShipments = () => {
    getShipments().then(setShipments)
  }

  const refreshStops = (vehicleId) => {
    getStops(vehicleId).then((stops) => {
      setVehicles((prev) => {
        const newVehicles = prev.map((vehicle) => {
          if (vehicle.id === vehicleId) {
            return { ...vehicle, stops }
          }
          return vehicle
        })
        return newVehicles
      })
    })
  }

  useEffect(() => {
    refreshVehicles()
    refreshShipments()
  }, [])

  return (
    <Store.Provider
      value={{
        vehicles,
        shipments,
        refreshVehicles,
        refreshShipments,
        refreshStops,
      }}
    >
      {children}
    </Store.Provider>
  )
}

export default StoreContext
