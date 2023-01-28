export const Input = ({ type, name, disabled = false, register }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 10 }}>
      <label htmlFor={name}>{name}</label>
      {type === 'textarea' ? (
        <textarea disabled={disabled} id={name} {...register(name)} />
      ) : (
        <input disabled={disabled} type={type} id={name} {...register(name)} />
      )}
    </div>
  )
}
