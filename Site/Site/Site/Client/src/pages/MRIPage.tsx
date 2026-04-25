import { Link } from 'react-router-dom'

export default function MRIPage() {
  return (
    <main>
      <section className="nx-page-hero nx-band-dark" style={{ borderBottom: '1px solid rgba(46,230,214,0.15)' }}>
        <div className="nx-container">
          <p className="nx-section-label">Modality · MRI</p>
          <h1>Magnetic resonance imaging</h1>
          <p style={{ color: 'rgba(255,255,255,0.55)' }}>
            High-field imaging with active shimming, motion-insensitive neuro protocols, and quantitative maps for
            oncology staging.
          </p>
        </div>
      </section>

      <section className="nx-section nx-band-dark">
        <div className="nx-container">
          <div className="nx-split" style={{ alignItems: 'stretch' }}>
            <div className="nx-mri-visual" style={{ minHeight: 400 }}>
              <div className="nx-scan-line" aria-hidden />
            </div>
            <div>
              <h2 style={{ color: '#fff', marginBottom: 16 }}>Acquisition stack</h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 24, lineHeight: 1.65 }}>
                Parallel imaging factors up to 4×, compressed SENSE variants for abdominal breath-holds, and
                silent sequences for pediatric compliance. Every study carries a hardware checksum in your record.
              </p>
              <div className="nx-glass-card" style={{ background: 'var(--nx-glass-dark)', borderColor: 'rgba(255,255,255,0.12)' }}>
                <h3 style={{ color: 'var(--nx-cyan)' }}>Common indications</h3>
                <ul>
                  <li>
                    <span className="nx-bullet" />
                    Neurology: demyelination, epilepsy focus, AVM surveillance
                  </li>
                  <li>
                    <span className="nx-bullet" />
                    MSK: ligamentous mapping, marrow edema quantification
                  </li>
                  <li>
                    <span className="nx-bullet" />
                    Body: liver iron, prostate mpMRI, enterography
                  </li>
                </ul>
              </div>
              <div className="nx-glass-card" style={{ marginTop: 20, background: 'rgba(231,76,90,0.08)', borderColor: 'rgba(231,76,90,0.25)' }}>
                <h3 style={{ color: '#ff8a8a' }}>Contraindications</h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)' }}>
                  Non-MRI-conditional implants, certain pacemakers, first-trimester elective scans (unless
                  clinically indicated), and retained ferromagnetic fragments require physicist review.
                </p>
              </div>
              <div style={{ marginTop: 28 }}>
                <Link to="/contacts#booking" className="nx-btn-primary">
                  Book MRI slot
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
