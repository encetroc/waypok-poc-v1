import {
  Dimensions,
  Input,
  MultiChoiceList,
  Section,
  SingleChoiceList,
  SubSection,
  Switch,
  GeneralInfo,
} from '@/components'
import { createVehicle } from '@/firebase/firestore'
import {
  cargoType,
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
      <div className="flex justify-between items-center">
        <h3>Create vehicle</h3>
        <div className="flex gap-2">
          <button type="submit">create</button>
          <button type="button" onClick={autofill}>
            autofill
          </button>
        </div>
      </div>
      <Section name="meta">
        <Switch name="template" register={register} />
        <Switch name="publish" register={register} />
        <Switch name="autoBook" register={register} />
      </Section>
      <GeneralInfo register={register} />
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
          <div className="flex gap-1">
            {shipmentContent.map((c) => (
              <Input key={c} name={c} register={register} />
            ))}
          </div>
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
