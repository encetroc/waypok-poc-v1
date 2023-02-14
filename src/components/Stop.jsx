import { useStore } from '@/context'
import { deleteStop } from '@/firebase/firestore'
import format from 'date-fns/format'

export const Stop = ({ stop, vehicleId }) => {
  const { refreshStops } = useStore()

  const handleDelete = async (stopId) => {
    const isSuccessful = await deleteStop(vehicleId, stopId)
    if (isSuccessful) refreshStops(vehicleId)
  }

  return (
    <div className="flex justify-between p-4">
      <div>
        <span>{stop.id}</span>
        <div>
          <strong>address: </strong>
          {stop.address}
        </div>
        <div>
          <strong>arrival: </strong>
          {format(new Date(stop.arrivalDateTime.seconds * 1000), 'Pp')}
        </div>
        <div>
          <strong>departure: </strong>
          {format(new Date(stop.departureDateTime.seconds * 1000), 'Pp')}
        </div>
      </div>
      <div>
        <button onClick={() => handleDelete(stop.id)}>delete</button>
      </div>
    </div>
  )
}
