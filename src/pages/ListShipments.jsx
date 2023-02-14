import { useStore } from '@/context'
import { deleteShipment } from '@/firebase/firestore'
import { StatusChip, Shipment } from '@/components'

export const ListShipments = () => {
  const { shipments, refreshShipments } = useStore()

  const handleDelete = async (vehicleId) => {
    const isSuccessful = await deleteShipment(vehicleId)
    if (isSuccessful) refreshShipments()
  }
  return (
    <div>
      <h1>Shipments</h1>
      <ul>
        {shipments.map((shipment) => (
          <li key={shipment.id}>
            <Shipment shipment={shipment} />
            <hr />
          </li>
        ))}
      </ul>
    </div>
  )
}
