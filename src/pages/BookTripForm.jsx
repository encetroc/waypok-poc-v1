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
    bookTrip(
      vehicle,
      shipment,
      vehicles
        .find((v) => v.id === watchVehicleSelection)
        .stops.filter((s) => s.id === departureStop || s.id === arrivalStop)
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Book Trip Form</h1>
      <Section name="actions">
        <button type="submit">book</button>
      </Section>
      <Select
        name="shipment"
        values={shipments.map((s) => s.id)}
        register={register}
        required
      />
      <Select
        name="vehicle"
        values={vehicles.map((v) => v.id)}
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
