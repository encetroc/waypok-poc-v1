import { useStore } from '@/context'
import {
  StatusChip,
  ShipmentDetails,
  Operation,
  StopDetails,
} from '@/components'
import { useState } from 'react'
import format from 'date-fns/format'
import { formatDate } from '@/helpers'
import { deleteShipment, cancelShipmentOperation } from '@/firebase/firestore'
import { useMemo } from 'react'

export const Shipment = ({ shipment }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const { refreshShipments } = useStore()
  const handleDelete = async (vehicleId) => {
    const isSuccessful = await deleteShipment(vehicleId)
    if (isSuccessful) refreshShipments()
  }
  const handleCancel = async () => {
    const isSuccessful = await cancelShipmentOperation(
      shipment.id,
      shipment.operations
    )
    if (isSuccessful) refreshShipments()
  }

  const isCompleted = useMemo(() => {
    return shipment.operations?.reduce(
      (acc, curr) => acc && curr.isCompleted,
      true
    )
  }, [shipment.operations])

  const calculateStatus = () => {
    if (shipment.operations?.length && isCompleted) return 'completed'
    if (shipment.operations?.length) return 'inProgress'
    return 'ready'
  }

  return (
    <div>
      <div className="flex justify-between p-2 bg-slate-300">
        <div className="flex gap-2">
          <StatusChip status={calculateStatus()} />
          <span>{shipment.id}</span>
          <span>{`(${shipment.weight}kg)`}</span>
        </div>
        <div className="flex gap-2 items-center">
          {!!shipment.operations?.length && !isCompleted && (
            <>
              <button onClick={handleCancel}>cancel</button>
            </>
          )}
          <button onClick={() => setIsExpanded((prev) => !prev)}>expand</button>
          <button onClick={() => handleDelete(shipment.id)}>delete</button>
        </div>
      </div>
      {isExpanded && (
        <div className="flex flex-col p-4 gap-4">
          <ShipmentDetails shipment={shipment} />
          <h5>operations</h5>
          <ul className="flex flex-col gap-2">
            {shipment.operations
              ?.sort(
                (a, b) =>
                  a.stop.arrivalDateTime.seconds -
                  b.stop.arrivalDateTime.seconds
              )
              .map((operation, index) => (
                <li key={operation.id}>
                  <div className="flex flex-col justify-between p-2 bg-slate-200 rounded-sm">
                    <div className="flex gap-2">
                      <Operation operation={operation.operation} />
                      <StatusChip
                        status={
                          operation.isCompleted ? 'completed' : 'inProgress'
                        }
                      />
                    </div>
                    <div>
                      <strong>operation ID: </strong>
                      {operation.id}
                    </div>
                    <StopDetails stop={operation.stop} />
                  </div>
                  <hr />
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  )
}
