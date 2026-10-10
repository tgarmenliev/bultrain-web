import './policy.css'

/** Renders a policy object from src/i18n/privacy-policy.js: summary box, numbered sections, lists and tables. */
export default function PolicyBody({ policy, headingLevel = 2, idPrefix = '' }) {
  const H = `h${headingLevel}`
  const Sub = `h${headingLevel + 1}`
  return (
    <>
      <aside className="policy-summary" aria-labelledby={`${idPrefix}summary`}>
        <p className="policy-summary__title" id={`${idPrefix}summary`}>{policy.summaryTitle}</p>
        <ul>
          {/* our own static strings (contain <strong>), never user input */}
          {policy.summary.map((s, i) => <li key={i} dangerouslySetInnerHTML={{ __html: s }} />)}
        </ul>
      </aside>

      {policy.sections.map((sec, i) => (
        <section key={i}>
          <H className="legal__sec">{i + 1}. {sec.title}</H>
          {sec.blocks.map((b, j) => {
            if (b.p) return <p key={j} dangerouslySetInnerHTML={{ __html: b.p }} />
            if (b.ul) return <ul key={j}>{b.ul.map((li, k) => <li key={k} dangerouslySetInnerHTML={{ __html: li }} />)}</ul>
            if (b.h) return <Sub key={j} className="policy-sub">{b.h}</Sub>
            if (b.table) {
              return (
                <div className="policy-table" key={j}>
                  <table>
                    <thead><tr>{b.table.head.map((h) => <th key={h} scope="col">{h}</th>)}</tr></thead>
                    <tbody>
                      {b.table.rows.map((row, r) => (
                        <tr key={r}>
                          <th scope="row">{row[0]}</th>
                          <td dangerouslySetInnerHTML={{ __html: row[1] }} />
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            }
            return null
          })}
        </section>
      ))}
    </>
  )
}
