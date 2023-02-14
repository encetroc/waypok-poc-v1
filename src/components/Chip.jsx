import clsx from 'clsx'

export const Chip = ({ children, className }) => {
  return (
    <span
      className={clsx(
        'flex items-center justify-center px-2 py-1 rounded-full text-sm font-medium w-24',
        className
      )}
    >
      {children}
    </span>
  )
}
