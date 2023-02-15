import { useForm, useFieldArray } from 'react-hook-form'

import {
  Switch,
  Input,
  MultiChoiceList,
  SingleChoiceList,
  Section,
  SubSection,
  Dimensions,
  GeneralInfo,
} from '@/components'
import {
  cargoType,
  vehicleType,
  inssurance,
  shipmentContent,
  createRandomShipment,
} from '@/mocks'
import { createShipment } from '@/firebase/firestore'
import { useStore } from '@/context'

export const CreateShipmentForm = () => {
  const { register, handleSubmit, setValue, reset } = useForm()
  const { refreshShipments } = useStore()

  const autofill = () => {
    Object.entries(createRandomShipment()).forEach((keyValuePair) =>
      setValue(keyValuePair[0], keyValuePair[1])
    )
  }

  const submit = async (data) => {
    const isSuccessful = await createShipment(data)
    if (isSuccessful) {
      reset()
      refreshShipments()
    }
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="flex justify-between items-center">
        <h3>Create shipment</h3>
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
      <Dimensions register={register} />
      <Section name="shipment type">
        <MultiChoiceList
          name="cargoType"
          values={cargoType}
          register={register}
        />
        <MultiChoiceList
          name="shipmentContent"
          values={shipmentContent}
          register={register}
        />
      </Section>
    </form>
  )
}
