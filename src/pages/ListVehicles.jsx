import { useStore } from '@/context'
import { Vehicle } from '@/components'

export const ListVehicles = () => {
  const { vehicles } = useStore()

  return (
    <div>
      <h3>Vehicles</h3>
      <ul>
        {vehicles.map((vehicle) => (
          <li key={vehicle.id}>
            <Vehicle vehicle={vehicle} />
            <hr />
          </li>
        ))}
      </ul>
    </div>
  )
}
