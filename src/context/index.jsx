import { createContext, useState, useEffect } from 'react'

import { getRealtimeVehicles } from '@/firebase/firestore'

export const Store = createContext()

export const StoreContext = ({ children }) => {
  const [vehicles, setVehicles] = useState([])

  useEffect(() => {
    const { data, unsubscribe } = getRealtimeVehicles()
    setVehicles(data)
    return unsubscribe
  }, [])

  return <Store.Provider value={{ vehicles }}>{children}</Store.Provider>
}

export default StoreContext
