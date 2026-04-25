import { Link } from 'react-router-dom'
import { IconCheck, IconHeart, IconUS } from '../components/Icons'

const subs = [
  { label: 'Cardiac', note: 'Strain, diastolic grades, structural' },
  { label: 'OB / fetal', note: 'Anatomy sweeps, Doppler safety caps' },
  { label: 'Abdomen', note: 'Liver stiffness, biliary tree HD' },
  { label: 'Thyroid', note: 'TI-RADS aligned reporting' },
  { label: 'Vascular', note: 'Plaque characterization' },
]

const checklist = [
  'Arrive hydrated unless NPO instructed',
  'Wear metal-free clothing for elastography',
  'Prior images on CD/USB accelerate comparison',
  'Pediatric guardian must be present for sedation-lite studies',
]

export default function UltrasoundPage() {
  return (
    <main>
      <section className="nx-page-hero nx-band-us">
        <div className="nx-container">
          <p className="nx-section-label">Modality · ultrasound</p>
          <h1>Ultrasound imaging</h1>
          <p>
            A sterile-white acoustic lab with probe-level traceability, shear-wave elastography, and structured
            worksheets for every organ system.
          </p>
        </div>
      </section>

      <section className="nx-section">
        <div className="nx-container">
          <div className="nx-split">
            <div>
              <div className="nx-section-head nx-section-head--center" style={{ marginBottom: 24 }}>
                <h2>Sub-specialty lanes</h2>
                <p>Pick the lane that matches your referral—protocols preload automatically.</p>
              </div>
              <div className="nx-us-icons">
                {subs.map((s) => (
                  <span key={s.label} className="nx-chip">
                    <span style={{ opacity: 0.75, display: 'flex' }}>
                      <IconUS className="nx-icon-24" />
                    </span>
                    {s.label}
                  </span>
                ))}
              </div>
              <div style={{ marginTop: 32 }}>
                <h3 style={{ fontSize: 16, marginBottom: 14, color: 'var(--nx-blue-deep)' }}>Pre-scan checklist</h3>
                <ul style={{ listStyle: 'none' }}>
                  {checklist.map((item) => (
                    <li
                      key={item}
                      style={{
                        display: 'flex',
                        gap: 12,
                        alignItems: 'flex-start',
                        padding: '12px 0',
                        borderBottom: '1px solid var(--nx-line)',
                        fontSize: 14,
                        color: 'var(--nx-text-muted)',
                      }}
                    >
                      <IconCheck className="nx-icon-24" style={{ color: 'var(--nx-cyan)', flexShrink: 0 }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <Link to="/contacts#booking" className="nx-btn-primary" style={{ marginTop: 28, display: 'inline-flex' }}>
                Schedule ultrasound
              </Link>
            </div>
            <div
              className="nx-panel"
              style={{
                alignSelf: 'stretch',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                textAlign: 'center',
                background: 'linear-gradient(180deg, rgba(46,230,214,0.06), #fff)',
              }}
            >
              <div style={{ margin: '0 auto 16px', color: 'var(--nx-blue)', display: 'flex', justifyContent: 'center' }}>
                <IconHeart className="nx-icon-24 nx-us-heart" />
              </div>
              <h3 style={{ marginBottom: 10 }}>Cardiac echo fast lane</h3>
              <p style={{ fontSize: 14, color: 'var(--nx-text-muted)' }}>
                Same-week slots for symptomatic patients with ED handoff packets—structured CSV + imaging keys for
                your cardiologist.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
