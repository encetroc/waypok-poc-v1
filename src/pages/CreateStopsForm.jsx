import { useState, useContext } from 'react'

import { useForm, useFieldArray } from 'react-hook-form'
import { Section, Input, Select } from '@/components'
import { createArrayOfStops } from '@/mocks'
import { createStops } from '@/firebase/firestore'
import { Store } from '@/context'

export const CreateStopsForm = () => {
  const { vehicles } = useContext(Store)
  const { register, handleSubmit, control, setValue } = useForm()
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

  const submit = (data) => {
    createStops(data.vehicle, data.stops)
  }
  return (
    <form onSubmit={handleSubmit(submit)}>
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
