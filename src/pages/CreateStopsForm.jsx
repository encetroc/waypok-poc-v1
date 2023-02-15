/* //TODO: delete whole file
import { useForm, useFieldArray } from 'react-hook-form'
import { Section, Input, Select } from '@/components'
import { createArrayOfStops } from '@/mocks'
import { createStops } from '@/firebase/firestore'
import { useStore } from '@/context'

export const CreateStopsForm = () => {
  const { vehicles } = useStore()
  const { refreshStops } = useStore()
  const { register, handleSubmit, control, setValue, reset } = useForm()
  const {
    fields: stops,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'stops',
  })

  const autofill = () => {
    setValue('stops', createArrayOfStops())
  }

  const submit = async (data) => {
    const isSuccessful = await createStops(data.vehicle, data.stops)
    if (isSuccessful) {
      reset()
      refreshStops(data.vehicle)
    }
  }
  return (
    <form onSubmit={handleSubmit(submit)}>
      <h3>Create Stops</h3>
      <Section name="choose vehicle">
        <Select
          values={vehicles.map((v) => v.id)}
          name="vehicle"
          register={register}
        />
      </Section>
      <Section name="actions">
        <button type="submit">create</button>
        <button type="button" onClick={autofill}>
          autofill
        </button>
      </Section>
      <Section name="schedule">
        <button
          type="button"
          onClick={() => {
            append()
          }}
        >
          append stop
        </button>
        <ul>
          {stops.map((stop, stopIndex) => {
            return (
              <li key={stop.id}>
                <div>
                  <h4>{`stop ${stopIndex}`}</h4>
                  <button type="button" onClick={() => remove(stopIndex)}>
                    delete stop
                  </button>
                </div>
                <div>
                  <Input
                    type="text"
                    name={`stops[${stopIndex}].address`}
                    register={register}
                  />
                  <Input
                    type="datetime-local"
                    name={`stops[${stopIndex}].arrivalDateTime`}
                    register={register}
                  />
                  <Input
                    type="datetime-local"
                    name={`stops[${stopIndex}].departureDateTime`}
                    register={register}
                  />
                </div>
              </li>
            )
          })}
        </ul>
      </Section>
    </form>
  )
}
 */
