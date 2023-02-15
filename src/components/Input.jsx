import clsx from 'clsx'

export const Input = ({
  type,
  name,
  register,
  required = false,
  className,
  ...rest
}) => {
  return (
    <div className={clsx('flex flex-col gap-2 min-w-0 flex-1', className)}>
      <label htmlFor={name}>{name}</label>
      {type === 'textarea' ? (
        <textarea {...rest} id={name} {...register(name, { required })} />
      ) : (
        <input
          {...rest}
          type={type}
          id={name}
          {...register(name, { required })}
        />
      )}
    </div>
  )
}
