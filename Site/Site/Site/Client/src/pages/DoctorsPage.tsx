import { Link } from 'react-router-dom'

const doctors = [
  {
    name: 'Dr. Elena Voss',
    role: 'Neuroradiology',
    exp: '16 years',
    bio: 'Quantitative MRI, CSF dynamics, and intraoperative mapping protocols.',
    img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80',
    cred: 'MD, PhD · EBNR',
  },
  {
    name: 'Dr. Marcus Chen',
    role: 'Cardiac imaging',
    exp: '12 years',
    bio: 'CT-FFR, spectral perfusion, and structural echo with strain analytics.',
    img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80',
    cred: 'MD, FACC · SCMR',
  },
  {
    name: 'Dr. Amira Okonkwo',
    role: 'Body MRI / Oncology',
    exp: '14 years',
    bio: 'Whole-body staging, LI-RADS, and MR-guided focus review boards.',
    img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&q=80',
    cred: 'MD · ABSR certified',
  },
]

export default function DoctorsPage() {
  return (
    <main>
      <section className="nx-page-hero">
        <div className="nx-container">
          <p className="nx-section-label">Specialists</p>
          <h1>Attending physicians</h1>
          <p>
            Subspecialty-trained radiologists and laboratory medical directors on rotating consoles—always on-call
            for critical value escalation.
          </p>
        </div>
      </section>

      <section className="nx-section">
        <div className="nx-container">
          <div className="nx-doc-grid">
            {doctors.map((d) => (
              <article key={d.name} className="nx-doc">
                <img src={d.img} alt="" />
                <div className="nx-doc-body">
                  <h3>{d.name}</h3>
                  <p className="role">{d.role}</p>
                  <p className="mono" style={{ fontSize: 12, color: 'var(--nx-caption)', marginBottom: 8 }}>
                    Experience · {d.exp}
                  </p>
                  <p>{d.bio}</p>
                  <p className="mono" style={{ fontSize: 11, letterSpacing: '0.06em', color: 'var(--nx-blue)' }}>
                    {d.cred}
                  </p>
                  <Link to="/contacts#booking" className="nx-btn-secondary" style={{ marginTop: 8, width: '100%' }}>
                    Book appointment
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="nx-doc-scroll">
            {doctors.map((d) => (
              <article key={`${d.name}-m`} className="nx-doc">
                <img src={d.img} alt="" />
                <div className="nx-doc-body">
                  <h3>{d.name}</h3>
                  <p className="role">{d.role}</p>
                  <p className="mono" style={{ fontSize: 12, color: 'var(--nx-caption)', marginBottom: 8 }}>
                    Experience · {d.exp}
                  </p>
                  <p>{d.bio}</p>
                  <p className="mono" style={{ fontSize: 11, letterSpacing: '0.06em', color: 'var(--nx-blue)' }}>
                    {d.cred}
                  </p>
                  <Link to="/contacts#booking" className="nx-btn-secondary" style={{ marginTop: 8, width: '100%' }}>
                    Book appointment
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <p style={{ textAlign: 'center', marginTop: 32, fontSize: 13, color: 'var(--nx-caption)' }}>
            Horizontally scroll on smaller breakpoints—cards maintain 44px touch targets.
          </p>
        </div>
      </section>
    </main>
  )
}
