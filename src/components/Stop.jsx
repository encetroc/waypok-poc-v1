import { useStore } from '@/context'
import { deleteStop, completeOperation } from '@/firebase/firestore'
import format from 'date-fns/format'
import {
  ShipmentDetails,
  Operation,
  StatusChip,
  StopDetails,
} from '@/components'

export const Stop = ({ stop, vehicleId }) => {
  const { refreshStops } = useStore()

  const handleDelete = async (stopId) => {
    const isSuccessful = await deleteStop(vehicleId, stopId)
    if (isSuccessful) refreshStops(vehicleId)
  }

  const handleComplete = async (operationId, shipmentOperationRef) => {
    const isSuccessful = await completeOperation(
      `vehicles/${vehicleId}/stops/${stop.id}/stopOperations/${operationId}`,
      shipmentOperationRef
    )
    if (isSuccessful) refreshStops(vehicleId)
  }

  return (
    <div className="flex flex-col p-4 gap-2 bg-slate-200 rounded-md">
      <StopDetails stop={stop} handleDelete={handleDelete} />
      <hr />
      <div className="flex flex-col pl-4 gap-2">
        <h5>operations</h5>
        <ul className="flex flex-col gap-2">
          {stop.operations?.map((operation, index) => (
            <li key={operation.id}>
              <div className="flex flex-col justify-between p-2 bg-slate-300 rounded-sm">
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <Operation operation={operation.operation} />
                    <StatusChip
                      status={
                        operation.isCompleted ? 'completed' : 'inProgress'
                      }
                    />
                  </div>
                  <button
                    onClick={() =>
                      handleComplete(
                        operation.id,
                        operation.shipmentOperationsRefs
                      )
                    }
                  >
                    complete
                  </button>
                </div>
                <div>
                  <strong>operation ID: </strong>
                  {operation.id}
                </div>
                <ShipmentDetails shipment={operation.shipment} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
