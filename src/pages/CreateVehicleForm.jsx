import { useForm, useFieldArray } from 'react-hook-form'

import {
  Switch,
  Input,
  MultiChoiceList,
  SingleChoiceList,
  Section,
  SubSection,
} from '@/components'
import { createVehicle } from '@/firebase/firestore'
import {
  cargoType,
  vehicleType,
  inssurance,
  createRandomVehicle,
  createRandomSchedule,
} from '@/mocks'

export const CreateVehicleForm = () => {
  const { register, handleSubmit, control, setValue } = useForm()
  const autofill = () => {
    const dummyVehicle = createRandomVehicle()
    Object.entries(dummyVehicle).forEach((keyValuePair) =>
      setValue(keyValuePair[0], keyValuePair[1])
    )
  }
  return (
    <form onSubmit={handleSubmit(createVehicle)}>
      <h1>create vehicle</h1>
      <Section name="actions">
        <button type="submit">create</button>
        <button type="button" onClick={autofill}>
          autofill
        </button>
      </Section>
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
          values={cargoType}
          register={register}
        />
        <SingleChoiceList
          name="vehicleType"
          values={vehicleType}
          register={register}
        />
      </Section>
      <Section name="dimensions">
        <Input name="weight" register={register} />
        <Input name="length" register={register} />
        <Input name="width" register={register} />
        <Input name="height" register={register} />
        <Input name="volume" register={register} />
        <Input name="area" register={register} />
      </Section>
      <Section name="constrains">
        <Input name="minWeight" register={register} />
        <Input name="mindistance" register={register} />
        <Input name="minVolume" register={register} />
      </Section>
      <Section name="pricing">
        <Input name="pricePerUnit" register={register} />
        <SubSection name="extraFees">
          <Input name="Solid" register={register} />
          <Input name="Liquid" register={register} />
          <Input name="Perishable" register={register} />
          <Input name="Fragile" register={register} />
          <Input name="Dangerous" register={register} />
        </SubSection>
        <SubSection name="deductions">
          <Input name="Delay" register={register} />
          <Input name="Stackable" register={register} />
        </SubSection>
        <SingleChoiceList
          name="inssurance"
          values={inssurance}
          register={register}
        />
      </Section>
    </form>
  )
}
