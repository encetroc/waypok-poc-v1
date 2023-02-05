export const Input = ({ type, name, register, ...rest }) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name}>{name}</label>
      {type === 'textarea' ? (
        <textarea {...rest} id={name} {...register(name)} />
      ) : (
        <input {...rest} type={type} id={name} {...register(name)} />
      )}
    </div>
  )
}
