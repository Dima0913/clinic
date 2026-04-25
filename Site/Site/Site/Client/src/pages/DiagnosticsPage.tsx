import { Link } from 'react-router-dom'
import { diagnosticCategories } from '../data/diagnostics'
import { IconCT, IconLab, IconMRI, IconUS } from '../components/Icons'

const hubs = [
  {
    to: '/mri',
    title: 'MRI suite',
    text: 'Neuro, MSK, body, breast—parallel transmit coils and compressed sensing.',
    icon: <IconMRI className="nx-icon-24" />,
  },
  {
    to: '/ct',
    title: 'CT bay',
    text: 'Spectral kernels, cardiac phase automation, pediatric dose governors.',
    icon: <IconCT className="nx-icon-24" />,
  },
  {
    to: '/ultrasound',
    title: 'Ultrasound lab',
    text: 'Elastography, OB, vascular, thyroid—probe intelligence ledger.',
    icon: <IconUS className="nx-icon-24" />,
  },
  {
    to: '/laboratory',
    title: 'Core laboratory',
    text: 'Hematology, chemistry, coag, microbiology—with cold-chain trace.',
    icon: <IconLab className="nx-icon-24" />,
  },
]

export default function DiagnosticsPage() {
  return (
    <main>
      <section className="nx-page-hero">
        <div className="nx-container">
          <p className="nx-section-label">Diagnostics hub</p>
          <h1>Unified routing for every modality</h1>
          <p>
            Choose a clinical rail. Each environment uses isolated physics QA, shared EHR hooks, and the same
            reporting grammar—so your data stays comparable over time.
          </p>
        </div>
      </section>

      <section className="nx-section nx-band-ct">
        <div className="nx-container">
          <div className="nx-card-grid">
            {hubs.map((h) => (
              <Link key={h.to} to={h.to} className="nx-panel">
                <div className="nx-panel-icon">{h.icon}</div>
                <h3>{h.title}</h3>
                <p>{h.text}</p>
                <span className="nx-btn-ghost">Enter module</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="nx-section">
        <div className="nx-container">
          <div className="nx-section-head nx-section-head--center">
            <p className="nx-section-label">Full matrix</p>
            <h2>All diagnostic categories</h2>
            <p>Cross-linked pathways for cardiology, neurology, oncology screening, and preventive rails.</p>
          </div>
          <div className="nx-card-grid">
            {diagnosticCategories.map((c) => (
              <Link
                key={c.key}
                to={c.to}
                className={`nx-panel${c.variant === 'dark' ? ' nx-panel--dark' : ''}`}
              >
                <div className="nx-panel-icon">{c.icon}</div>
                <h3>{c.title}</h3>
                <p>{c.description}</p>
                <span className="nx-btn-ghost">Learn more</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
