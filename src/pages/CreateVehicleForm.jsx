import {
  Dimensions,
  Input,
  MultiChoiceList,
  Section,
  SingleChoiceList,
  SubSection,
  Switch,
} from '@/components'
import { createVehicle } from '@/firebase/firestore'
import {
  cargoType,
  createRandomSchedule,
  createRandomVehicle,
  inssurance,
  shipmentContent,
  vehicleType,
} from '@/mocks'
import { useContext } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useStore } from '@/context'

export const CreateVehicleForm = () => {
  const { register, handleSubmit, control, setValue, reset } = useForm()
  const { refreshVehicles } = useStore()

  const autofill = () => {
    const dummyVehicle = createRandomVehicle()
    Object.entries(dummyVehicle).forEach((keyValuePair) =>
      setValue(keyValuePair[0], keyValuePair[1])
    )
  }

  const submit = async (data) => {
    const isSuccessful = await createVehicle(data)
    if (isSuccessful) {
      reset()
      refreshVehicles()
    }
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <h1>Create vehicle</h1>
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
      <Dimensions register={register} />
      <Section name="constrains">
        <Input name="minWeight" register={register} />
        <Input name="mindistance" register={register} />
        <Input name="minVolume" register={register} />
      </Section>
      <Section name="pricing">
        <Input name="pricePerUnit" register={register} />
        <SubSection name="extraFees">
          {shipmentContent.map((c) => (
            <Input key={c} name={c} register={register} />
          ))}
        </SubSection>
        <SubSection name="deductions">
          <Input name="Delay" register={register} />
          <Input name="Stackable" register={register} />
        </SubSection>
      </Section>
      <Section name="inssurance">
        <SingleChoiceList
          name="inssurance"
          values={inssurance}
          register={register}
        />
      </Section>
    </form>
  )
}
