export const Input = ({ type, name, register, ...rest }) => {
  return (
    <div>
      <label htmlFor={name}>{name}</label>
      {type === 'textarea' ? (
        <textarea {...rest} id={name} {...register(name)} />
      ) : (
        <input {...rest} type={type} id={name} {...register(name)} />
      )}
    </div>
  )
}
