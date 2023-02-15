import { createStop } from '@/firebase/firestore'
import { useStore } from '@/context'
import { useForm } from 'react-hook-form'
import { Input, TimeInput } from '@/components'
import { datePlaceHolder, createDateTime } from '@/helpers'
import { createRandomStop } from '@/mocks'

export const CreateStopForm = ({ vehicleId }) => {
  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      arrivalTimeHour: 0,
      arrivalTimeMinute: 0,
      departureTimeHour: 0,
      departureTimeMinute: 0,
      departureDate: new Date().toISOString().split('T')[0],
    },
  })
  const { refreshStops } = useStore()

  const submit = async (data) => {
    let arrivalDateTime = null
    let departureDateTime = createDateTime(
      data.departureDate,
      data.departureTimeHour,
      data.departureTimeMinute
    )
    if (!!data.arrivalDate) {
      arrivalDateTime = createDateTime(
        data.arrivalDate,
        data.arrivalTimeHour,
        data.arrivalTimeMinute
      )
    } else {
      arrivalDateTime = departureDateTime
    }
    const isSuccessful = await createStop(vehicleId, {
      address: data.address,
      arrivalDateTime,
      departureDateTime,
    })
    if (isSuccessful) {
      reset()
      refreshStops(vehicleId)
    }
  }

  const autofill = () => {
    const dummyStop = createRandomStop()
    Object.entries(dummyStop).forEach((keyValuePair) =>
      setValue(keyValuePair[0], keyValuePair[1])
    )
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-2">
      <div className="flex gap-2">
        <h6>{`create stop for vehicle ${vehicleId}`}</h6>
        <button type="submit">create</button>
        <button type="button" onClick={autofill}>
          autofill
        </button>
      </div>
      <Input name="address" register={register} required />
      <div className="flex gap-2">
        <Input
          name="arrivalDate"
          type="date"
          placeholder={datePlaceHolder}
          register={register}
        />
        <TimeInput className="flex-1" name="arrivalTime" register={register} />
      </div>
      <div className="flex gap-2">
        <Input
          name="departureDate"
          type="date"
          register={register}
          placeholder={datePlaceHolder}
          required
        />
        <TimeInput
          className="flex-1"
          name="departureTime"
          register={register}
        />
      </div>
    </form>
  )
}
