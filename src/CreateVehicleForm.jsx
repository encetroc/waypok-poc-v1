import { useForm, useFieldArray, Controller } from 'react-hook-form'

import { Switch } from '@/components/Switch'
import { Section, SubSection } from '@/components/Section'
import { Input } from '@/components/Input'
import { MultiChoiceList } from '@/components/MultiChoiceList'
import { SingleChoiceList } from '@/components/SingleChoiceList'
import { CreateTripForm } from './components/CreateTripForm'

export const CreateVehicleForm = () => {
  const { register, handleSubmit, control } = useForm()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'trips',
  })
  const onSubmit = (data) => console.log(data)
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>create vehicle</h1>
      <Section name="meta">
        <Switch name="template" register={register} />
        <Switch name="publish" register={register} />
        <Switch name="autoBook" register={register} />
      </Section>
      <Section name="general info">
        <Input type="text" name="title" register={register} />
        <Input type="textarea" name="description" register={register} />
        <Input type="text" name="internalRef" register={register} />
        <Input type="text" name="externalRef" register={register} />
      </Section>
      <Section name="transportation type">
        <Switch name="grouped" register={register} />
        <MultiChoiceList
          name="cargoType"
          values={['container', 'refregirated', 'dumpster']}
          register={register}
        />
        <SingleChoiceList
          name="VehicleType"
          values={['Bus', 'Tanker', 'Tipper']}
          register={register}
        />
      </Section>
      <Section name="dimensions">
        <Input type="number" name="weight" register={register} />
        <Input type="number" name="length" register={register} />
        <Input type="number" name="width" register={register} />
        <Input type="number" name="height" register={register} />
        <Input type="number" name="volume" register={register} />
        <Input type="number" name="area" register={register} />
      </Section>
      <Section name="constrains">
        <Input type="number" name="minWeight" register={register} />
        <Input type="number" name="mindistance" register={register} />
        <Input type="number" name="minVolume" register={register} />
      </Section>
      <Section name="pricing">
        <Input type="number" name="pricePerUnit" register={register} />
        <SubSection name="extraFees">
          <Input type="number" name="Solid" register={register} />
          <Input type="number" name="Liquid" register={register} />
          <Input type="number" name="Perishable" register={register} />
          <Input type="number" name="Fragile" register={register} />
          <Input type="number" name="Dangerous" register={register} />
        </SubSection>
        <SubSection name="deductions">
          <Input type="number" name="Delay" register={register} />
          <Input type="number" name="Staackable" register={register} />
        </SubSection>
        <SingleChoiceList
          name="inssurance"
          values={['tier1', 'tier2', 'tier3']}
          register={register}
        />
      </Section>
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
          {fields.map((trip, tripIndex) => (
            <li
              style={{
                border: '1px solid gray',
                padding: '10px',
                margin: '10px',
              }}
              key={trip.id}
            >
              <h3>
                <u>{`trip ${tripIndex}`}</u>
              </h3>
              <button type="button" onClick={() => remove(tripIndex)}>
                delete trip
              </button>
              <CreateTripForm {...{ control, register, tripIndex }} />
            </li>
          ))}
        </ul>
      </Section>
      <Section name="actions">
        <button type="submit">create</button>
      </Section>
    </form>
  )
}
