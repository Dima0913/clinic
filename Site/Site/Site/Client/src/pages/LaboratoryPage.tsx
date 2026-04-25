import { Link } from 'react-router-dom'

const rows = [
  { group: 'Hematology', name: 'CBC + differential', prep: 'None', tat: '2h', badge: 'hem' as const },
  { group: 'Chemistry', name: 'Comprehensive metabolic', prep: '10–12h fasting', tat: '4h', badge: 'chem' as const },
  { group: 'Chemistry', name: 'Lipid panel + ApoB', prep: 'Fasting preferred', tat: '4h', badge: 'chem' as const },
  { group: 'Coagulation', name: 'PT/INR, aPTT', prep: 'Hold anticoag per MD', tat: '2h', badge: 'chem' as const },
  { group: 'Microbiology', name: 'Blood culture ×2', prep: 'Aseptic prep on-site', tat: '5–7d', badge: 'micro' as const },
  { group: 'Microbiology', name: 'Respiratory PCR panel', prep: 'Deep nasal swab', tat: '6h', badge: 'micro' as const },
]

export default function LaboratoryPage() {
  return (
    <main>
      <section className="nx-page-hero">
        <div className="nx-container">
          <p className="nx-section-label">Core laboratory</p>
          <h1>Laboratory tests &amp; analysis</h1>
          <p>
            High-density analytics UI behind the scenes—robotic accessioning, delta checks, and neon-traced audit
            trails for every aliquot.
          </p>
        </div>
      </section>

      <section className="nx-section">
        <div className="nx-container">
          <div className="nx-lab-cards">
            <div className="nx-mini-card">
              <strong>Preparation</strong>
              Fasting rules auto-synced to your portal. Pediatric kits ship overnight.
            </div>
            <div className="nx-mini-card">
              <strong>Turnaround</strong>
              Stat chem within 60 minutes for ED referrals. Culture callbacks via secure SMS.
            </div>
            <div className="nx-mini-card">
              <strong>Pricing</strong>
              Bundled panels reduce draw fees. Self-pay estimator in checkout flow.
            </div>
            <div className="nx-mini-card">
              <strong>Indications</strong>
              Synoptic templates map ICD-10 hints to suggested panels—physician override required.
            </div>
          </div>

          <div className="nx-table-wrap">
            <table className="nx-table">
              <thead>
                <tr>
                  <th>Group</th>
                  <th>Analysis</th>
                  <th>Preparation</th>
                  <th>Typical TAT</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.name}>
                    <td>
                      <span
                        className={`nx-badge nx-badge--${
                          r.badge === 'hem' ? 'hem' : r.badge === 'micro' ? 'micro' : 'chem'
                        }`}
                      >
                        {r.group}
                      </span>
                    </td>
                    <td style={{ color: 'var(--nx-text)', fontWeight: 600 }}>{r.name}</td>
                    <td>{r.prep}</td>
                    <td className="mono">{r.tat}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: 40, textAlign: 'center' }}>
            <Link to="/contacts#booking" className="nx-btn-primary">
              Book lab visit
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
