import { Link } from 'react-router-dom'

export default function CTPage() {
  return (
    <main>
      <section className="nx-page-hero nx-band-ct">
        <div className="nx-container">
          <p className="nx-section-label">Modality · CT</p>
          <h1>Computed tomography</h1>
          <p>Spectral kernels, iterative reconstruction, and organ-specific dose cards for every acquisition.</p>
        </div>
      </section>

      <section className="nx-section">
        <div className="nx-container">
          <div className="nx-split">
            <div
              style={{
                borderRadius: 'var(--nx-radius-xl)',
                minHeight: 380,
                background:
                  'linear-gradient(145deg, rgba(59,111,182,0.25), rgba(46,230,214,0.12)), url(https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&q=80) center/cover',
                border: '1px solid var(--nx-line)',
                boxShadow: 'var(--nx-shadow-soft)',
              }}
            />
            <div>
              <div className="nx-section-head nx-section-head--center" style={{ marginBottom: 28 }}>
                <h2>Clinical CT rails</h2>
                <p>
                  Trauma, stroke, PE, and oncology staging share a unified contrast policy engine. Bolus tracking
                  curves are archived for audit.
                </p>
              </div>
              <div className="nx-panel" style={{ marginBottom: 16 }}>
                <h3 style={{ marginBottom: 8 }}>Transparent pricing band</h3>
                <p style={{ marginBottom: 12 }}>
                  Typical outpatient CT with contrast: <span className="nx-price mono">$680 – $920</span> depending
                  on region and phase count. Self-pay bundles available.
                </p>
                <Link to="/prices" className="nx-btn-ghost">
                  Open full price index
                </Link>
              </div>
              <Link to="/contacts#booking" className="nx-btn-primary">
                Book CT
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
