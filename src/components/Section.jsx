export const Section = ({ name, children }) => {
  return (
    <section>
      <h2>{name}</h2>
      <hr />
      {children}
    </section>
  )
}

export const SubSection = ({ name, children }) => {
  return (
    <section>
      <h3>
        <u>{name}</u>
      </h3>
      {children}
    </section>
  )
}
