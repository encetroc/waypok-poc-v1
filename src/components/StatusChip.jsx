import { Chip } from './Chip'

export const StatusChip = ({ status }) => {
  const statusColor = {
    ready: 'bg-gray-200 text-gray-800',
    pending: 'bg-yellow-200 text-yellow-800',
    inProgress: 'bg-blue-200 text-blue-800',
    completed: 'bg-green-200 text-green-800',
    cancelled: 'bg-red-200 text-red-800',
    notReady: 'bg-red-200 text-red-800',
  }
  return <Chip className={statusColor[status]}>{status}</Chip>
}
