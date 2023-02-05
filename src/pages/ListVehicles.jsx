import { useContext } from 'react'

import { Store } from '@/context'

export const ListVehicles = () => {
  const { vehicles } = useContext(Store)
  return (
    <ul>
      {vehicles.map((vehicle) => (
        <li key={vehicle.id}>
          <div>
            <span>{vehicle.id}</span>
            <strong>{vehicle.title}</strong>
            <button>delete</button>
          </div>

          <hr />
        </li>
      ))}
    </ul>
  )
}
