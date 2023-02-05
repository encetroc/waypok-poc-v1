export const Switch = ({ name, register, disabled = false }) => {
  return (
    <div className="flex gap-2">
      <input
        disabled={disabled}
        type="checkbox"
        id={name}
        {...register(name)}
      />
      <label htmlFor={name}>{name}</label>
    </div>
  )
}
