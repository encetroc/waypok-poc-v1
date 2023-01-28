export const MultiChoiceList = ({
  name,
  values,
  disabled = false,
  register,
}) => {
  return (
    <fieldset>
      <legend>{name}</legend>
      <ul>
        {values.map((value) => (
          <li key={value}>
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
    </fieldset>
  )
}
