import clsx from 'clsx'

export const Section = ({ children, name, className = 'flex-col' }) => {
  return (
    <section className="mb-4">
      <h4>{name}</h4>
      <hr />
      <div className={clsx('flex gap-2', className)}>{children}</div>
    </section>
  )
}

export const SubSection = ({ name, children }) => {
  return (
    <section>
      <h5>{name}</h5>
      {children}
    </section>
  )
}
