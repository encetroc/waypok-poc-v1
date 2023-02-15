import { useStore } from '@/context'
import { Select, Section } from '@/components'
import { bookTrip } from '@/firebase/firestore'
import { useForm } from 'react-hook-form'
import { useMemo } from 'react'

export const BookTripForm = () => {
  const { shipments, vehicles } = useStore()
  const { handleSubmit, register, reset, watch } = useForm()
  const watchVehicleSelection = watch('vehicle', null)
  const watchDepartureStops = watch('departureStop', null)

  const departueStops = useMemo(() => {
    if (!watchVehicleSelection) return []
    return vehicles
      .find((v) => v.id === watchVehicleSelection)
      .stops.map((s) => s.id)
  }, [watchVehicleSelection, vehicles])

  const arrivalStops = useMemo(() => {
    if (!watchDepartureStops) return []
    const index = departueStops.findIndex((id) => id === watchDepartureStops)
    return departueStops.slice(index + 1)
  }, [watchDepartureStops, departueStops])

  const onSubmit = ({ shipment, vehicle, departureStop, arrivalStop }) => {
    const isSuccessful = bookTrip(vehicle, shipment, [
      departureStop,
      arrivalStop,
    ])
    if (isSuccessful) reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between items-center">
        <h3>Book trip</h3>
        <div className="flex gap-2">
          <button type="submit">book</button>
        </div>
      </div>
      <Select
        name="shipment"
        values={shipments.filter((s) => !s.operations.length).map((s) => s.id)}
        register={register}
        required
      />
      <Select
        name="vehicle"
        values={vehicles.filter((v) => !!v.stops.length).map((v) => v.id)}
        register={register}
        required
      />
      <Select
        name="departureStop"
        values={departueStops}
        register={register}
        required
      />
      <Select
        name="arrivalStop"
        values={arrivalStops}
        register={register}
        required
      />
    </form>
  )
}
