import { useFieldArray } from 'react-hook-form'
import { Section } from '@/components/Section'
import { CreateStopsForm } from '@/components/CreateStopsForm'

export const CreateTripsForm = ({ control, register }) => {
  const {
    fields: trips,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'trips',
  })
  return (
    <Section name="schedule">
      <button
        type="button"
        onClick={() => {
          append()
        }}
      >
        append trip
      </button>
      <ul>
        {trips.map((trip, tripIndex) => (
          <li
            style={{
              border: '1px solid gray',
              padding: '10px',
              margin: '10px',
              backgroundColor: 'white',
            }}
            key={trip.id}
          >
            <h3>
              <u>{`trip ${tripIndex}`}</u>
            </h3>
            <button type="button" onClick={() => remove(tripIndex)}>
              delete trip
            </button>
            <CreateStopsForm {...{ control, register, tripIndex }} />
          </li>
        ))}
      </ul>
    </Section>
  )
}
