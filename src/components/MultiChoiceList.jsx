export const MultiChoiceList = ({
  name,
  values,
  disabled = false,
  register,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <legend>{name}</legend>
      <ul>
        {values.map((value) => (
          <li className="flex gap-2" key={value}>
            <input
              disabled={disabled}
              type="checkbox"
              id={value}
              value={value}
              {...register(name)}
            />
            <label htmlFor={value}>{value}</label>
          </li>
        ))}
      </ul>
    </div>
  )
}
