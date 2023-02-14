import { deleteVehicle } from '@/firebase/firestore'
import { useState } from 'react'

import format from 'date-fns/format'
import { useStore } from '@/context'
import { Stop, CreateStopForm } from '@/components'

export const Vehicle = ({ vehicle }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const { refreshVehicles } = useStore()

  const handleDelete = async (vehicleId) => {
    const isSuccessful = await deleteVehicle(vehicleId)
    if (isSuccessful) refreshVehicles()
  }

  return (
    <div>
      <div className="flex justify-between p-2 bg-slate-300">
        <div>
          <span>{vehicle.id}</span>
          <strong>{`(${vehicle.stops.length} stops)`}</strong>
        </div>
        <div>
          <button onClick={() => setIsExpanded((prev) => !prev)}>expand</button>
          <button onClick={() => handleDelete(vehicle.id)}>delete</button>
        </div>
      </div>
      {isExpanded && (
        <div>
          <CreateStopForm vehicleId={vehicle.id} />
          <ul>
            {vehicle.stops.map((stop, index) => (
              <li key={stop.id}>
                <Stop stop={stop} vehicleId={vehicle.id} />
                <hr />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
