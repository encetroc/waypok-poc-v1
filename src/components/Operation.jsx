import clsx from 'clsx'

export const Operation = ({ operation }) => {
  const styling = () => {
    switch (operation) {
      case 'pickup':
        return 'bg-green-200'
      case 'dropoff':
        return 'bg-red-200'
      default:
        return 'bg-gray-200'
    }
  }

  return (
    <span
      className={clsx(
        'flex justify-center align-middle rounded-lg w-20',
        styling()
      )}
    >
      {operation}
    </span>
  )
}
