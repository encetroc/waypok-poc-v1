export const Mesurment = ({ prefix, value, unit }) => {
  return (
    <div className="flex border border-gray-700 rounded-md justify-center">
      <span className="p-2 bg-slate-500 text-white">{prefix}</span>
      <span className="font-bold p-2 border-l border-r border-gray-700 bg-slate-100">
        {value ? value : '-'}
      </span>
      <span className="p-2">
        <i>{unit}</i>
      </span>
    </div>
  )
}
