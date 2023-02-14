import { Select } from '@/components'
import clsx from 'clsx'

const hours = Array.from({ length: 24 }, (_, i) => i)
const minutes = Array.from({ length: 60 }, (_, i) => i)

export const TimeInput = ({ name, register, className }) => {
  return (
    <div className={clsx('flex gap-1', className)}>
      <Select
        name={`${name}Hour`}
        register={register}
        values={hours}
        className="flex-1"
      />
      <Select
        name={`${name}Minute`}
        register={register}
        values={minutes}
        className="flex-1"
      />
    </div>
  )
}
