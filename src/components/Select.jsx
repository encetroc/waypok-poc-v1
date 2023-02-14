import clsx from 'clsx'

export const Select = ({
  values,
  name,
  register,
  required = false,
  className,
}) => {
  return (
    <div className={clsx('flex flex-col gap-2', className)}>
      <label htmlFor={name}>{name}</label>
      <select
        className="min-h-[28px] flex-1"
        name={name}
        id={name}
        {...register(name, { required })}
      >
        <option value="">
          {!!values?.length ? '--choose--' : '--nothing--'}
        </option>
        {values.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  )
}
