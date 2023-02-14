import { useStore } from '@/context'
import { StatusChip } from '@/components'
import { useState } from 'react'
import format from 'date-fns/format'
import { formatDate } from '@/helpers'

export const Shipment = ({ shipment }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const { refreshShipments } = useStore()
  const handleDelete = async (vehicleId) => {
    const isSuccessful = await deleteShipment(vehicleId)
    if (isSuccessful) refreshShipments()
  }
  return (
    <div>
      <div className="flex justify-between p-2 bg-slate-300">
        <div className="flex gap-2">
          {!!shipment.operations?.length ? (
            <StatusChip status="inProgress" />
          ) : (
            <StatusChip status="ready" />
          )}
          <span>{shipment.id}</span>
          <span>{`(${shipment.weight}kg)`}</span>
        </div>
        <div>
          {!!shipment.operations?.length && (
            <>
              <button>cancel</button>
              <button onClick={() => setIsExpanded((prev) => !prev)}>
                expand
              </button>
            </>
          )}
          <button onClick={() => handleDelete(shipment.id)}>delete</button>
        </div>
      </div>
      {isExpanded && (
        <ul>
          {shipment.operations?.map((operation, index) => (
            <li key={operation.id}>
              <div className="flex flex-col justify-between p-4">
                <span>{operation.id}</span>
                {operation.arrivalDateTime && (
                  <div>
                    <strong>arrival date: </strong>
                    {formatDate(operation.arrivalDateTime.seconds)}
                  </div>
                )}
                {operation.departureDateTime && (
                  <div>
                    <strong>arrival date: </strong>
                    {formatDate(operation.departureDateTime.seconds)}
                  </div>
                )}
                <div>
                  <strong>operation: </strong>
                  {operation.operation}
                </div>
              </div>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
