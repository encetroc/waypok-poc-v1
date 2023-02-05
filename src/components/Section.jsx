export const Section = ({ name, children }) => {
  return (
    <section className="mb-4">
      <h2>{name}</h2>
      <hr />
      <div className="flex flex-col gap-2">{children}</div>
    </section>
  )
}

export const SubSection = ({ name, children }) => {
  return (
    <section>
      <h3>{name}</h3>
      {children}
    </section>
  )
}
