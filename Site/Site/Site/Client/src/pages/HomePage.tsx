import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import type { Service } from '../types'

type HomePageProps = {
  services: Service[]
}

const pickServiceEmoji = (serviceName: string) => {
  const value = serviceName.toLowerCase()
  if (value.includes('склеротерап')) return '💉'
  if (value.includes('лазер')) return '⚡'
  if (value.includes('дитяч') || value.includes('хірург')) return '🩺'
  if (value.includes('трофіч')) return '🩹'
  if (value.includes('тромбофлеб')) return '🫀'
  return '🩹'
}

export default function HomePage({ services }: HomePageProps) {
  const orderedServices = [...services].sort((a, b) => a.displayOrder - b.displayOrder)

  return (
    <main>
      <Hero />

      <section className="nx-section" aria-labelledby="promo-heading">
        <div className="nx-container">
          <div className="nx-section-head nx-section-head--center">
            <p className="nx-section-label">Ваші ноги — ваш опорний ритм</p>
            <h2 id="promo-heading">Не залишайте ніжки без уваги</h2>
            <p>
              Адже вони вас годують. Допоможу позбутися варикозу та повернути легкість у ногах. Лікуємо варикоз
              методом ендовенозної лазерної коагуляції (абляції) та склеротерапії під контролем УЗД.
            </p>
          </div>
        </div>
      </section>

      <section className="nx-section" style={{ background: 'var(--nx-white)', paddingTop: 0 }} aria-labelledby="svc-grid">
        <div className="nx-container">
          <div className="nx-section-head nx-section-head--center">
            <p className="nx-section-label">Напрями</p>
            <h2 id="svc-grid">Послуги</h2>
          </div>

          {orderedServices.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--nx-text-muted)' }}>
              Послуги завантажуються або тимчасово недоступні.
            </p>
          ) : (
            <div className="nx-photo-grid">
              {orderedServices.map((service) => (
                <Link key={service.id} to={`/contacts#booking?serviceId=${service.id}`} className="nx-photo-card">
                  <div className="nx-photo-card-overlay">
                    <span className="nx-photo-card-emoji" aria-hidden>
                      {pickServiceEmoji(service.name)}
                    </span>
                    <span className="nx-photo-card-title">{service.name}</span>
                    <span className="nx-photo-card-go" aria-hidden>
                      →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="nx-cta-banner">
            <p>
              <strong style={{ color: '#fff' }}>Життя без варикозу можливе.</strong> Запишіться на консультацію до
              судинного хірурга та флеболога — підбір методу лікування та УЗД-діагностика.
            </p>
            <Link to="/contacts#booking" className="nx-btn-primary">
              Записатись на прийом
            </Link>
          </div>
        </div>
      </section>

      <section className="nx-section nx-band-dark">
        <div className="nx-container">
          <div className="nx-section-head nx-section-head--center">
            <p className="nx-section-label">Лікар</p>
            <h2>Савич Олексій Олегович</h2>
            <p style={{ color: 'rgba(255,255,255,0.55)' }}>
              Судинний хірург, флеболог, лікар УЗД, дитячий хірург. Вітаю! Допоможу позбутися варикозу та повернути
              легкість у ногах.
            </p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Link to="/about" className="nx-btn-secondary">
              Детальніше про лікаря
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
