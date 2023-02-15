import format from 'date-fns/format'

export const StopDetails = ({ stop, handleDelete = null }) => {
  return (
    <div className="flex flex-col justify-between">
      <div className="flex justify-between pb-2">
        <div>
          <strong>stop ID: </strong>
          {stop.id}
        </div>
        {!!handleDelete && (
          <div>
            <button onClick={() => handleDelete(stop.id)}>delete</button>
          </div>
        )}
      </div>
      <div>
        <strong>address: </strong>
        {stop.address}
      </div>
      <div>
        <strong>arrival: </strong>
        {format(new Date(stop.arrivalDateTime.seconds * 1000), 'Pp')}
      </div>
      <div>
        <strong>departure: </strong>
        {format(new Date(stop.departureDateTime.seconds * 1000), 'Pp')}
      </div>
    </div>
  )
}
