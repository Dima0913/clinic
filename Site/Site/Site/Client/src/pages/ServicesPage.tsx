import { Link } from 'react-router-dom'
import type { Service } from '../types'

type ServicesPageProps = {
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

export default function ServicesPage({ services }: ServicesPageProps) {
  const ordered = [...services].sort((a, b) => a.displayOrder - b.displayOrder)

  return (
    <main>
      <section className="nx-page-hero">
        <div className="nx-container">
          <p className="nx-section-label">Послуги</p>
          <h1>Наші послуги</h1>
          <p>Повний спектр медичних послуг для лікування судинних захворювань нижніх кінцівок та супутніх станів.</p>
        </div>
      </section>

      <section className="nx-section">
        <div className="nx-container">
          <div className="nx-cta-banner">
            <div>
              <h3 style={{ color: '#fff', fontSize: 20, marginBottom: 10 }}>Приділіть вашим ніжкам належну увагу</h3>
              <p style={{ margin: 0 }}>
                Не залишайте ніжки без уваги — адже вони вас годують. Лікуємо варикоз методом ендовенозної лазерної
                коагуляції (абляції) та склеротерапії під контролем УЗД.
              </p>
              <p style={{ marginTop: 12, color: 'var(--nx-cyan)', fontWeight: 700 }}>Життя без варикозу можливе</p>
            </div>
            <Link to="/contacts#booking" className="nx-btn-primary">
              Записатись
            </Link>
          </div>
        </div>
      </section>

      <section className="nx-section" style={{ background: 'var(--nx-white)' }}>
        <div className="nx-container">
          <div className="nx-section-head nx-section-head--center">
            <h2>Каталог послуг</h2>
            <p style={{ color: 'var(--nx-text-muted)' }}>Оберіть напрям — перейдіть до онлайн-запису.</p>
          </div>
          {ordered.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--nx-text-muted)' }}>Каталог завантажується або тимчасово недоступний.</p>
          ) : (
            <div className="nx-card-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
              {ordered.map((service) => (
                <div key={service.id} className="nx-panel">
                  <p style={{ fontSize: 36, lineHeight: 1, marginBottom: 12 }} aria-hidden>
                    {pickServiceEmoji(service.name)}
                  </p>
                  <h3>{service.name}</h3>
                  <p>{service.description ?? ''}</p>
                  <Link to={`/contacts#booking?serviceId=${service.id}`} className="nx-btn-secondary" style={{ width: '100%' }}>
                    Записатись
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="nx-section">
        <div className="nx-container">
          <div className="nx-section-head nx-section-head--center">
            <h2>Як проходить лікування</h2>
          </div>
          <div className="nx-card-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
            {[
              { n: '1', t: 'Консультація', d: 'Огляд судинного хірурга, оцінка стану вен, план обстеження.' },
              { n: '2', t: 'УЗД-діагностика', d: 'Детальне УЗД судин для вибору методу — ЕВЛК або склеротерапія.' },
              { n: '3', t: 'Лікування', d: 'ЕВЛК або склеротерапія під УЗД-контролем, мінімально інвазивно.' },
              { n: '4', t: 'Спостереження', d: 'Рекомендації та контрольні візити за показаннями.' },
            ].map((step) => (
              <div key={step.n} className="nx-panel">
                <p className="mono" style={{ fontSize: 12, color: 'var(--nx-cyan)', marginBottom: 8 }}>
                  Крок {step.n}
                </p>
                <h3 style={{ fontSize: 17 }}>{step.t}</h3>
                <p style={{ marginBottom: 0 }}>{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="nx-section nx-band-dark">
        <div className="nx-container">
          <div className="nx-section-head nx-section-head--center">
            <h2 style={{ color: '#fff' }}>Часті запитання</h2>
          </div>
          <div style={{ maxWidth: 800, margin: '0 auto', display: 'grid', gap: 12 }}>
            {[
              {
                q: 'Скільки триває процедура ЕВЛК?',
                a: 'Зазвичай 30–60 хвилин залежно від обсягу. Після процедури можна йти додому за показаннями лікаря.',
              },
              {
                q: 'Чи боляче лікування варикозу лазером?',
                a: 'Процедура виконується під місцевою анестезією; больові відчуття мінімальні.',
              },
              {
                q: 'Чи залишаються шрами?',
                a: 'Прокол під УЗД-контролем — без класичних розрізів, рубців практично не буває.',
              },
            ].map((item) => (
              <div key={item.q} className="nx-panel nx-panel--dark">
                <h3 style={{ fontSize: 15, marginBottom: 8 }}>{item.q}</h3>
                <p style={{ marginBottom: 0, fontSize: 14 }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="nx-section">
        <div className="nx-container" style={{ textAlign: 'center' }}>
          <h2 style={{ marginBottom: 12 }}>Готові почати?</h2>
          <p style={{ color: 'var(--nx-text-muted)', maxWidth: 560, margin: '0 auto 24px' }}>
            Запишіться на консультацію та УЗД — підберемо оптимальний метод лікування.
          </p>
          <Link to="/contacts#booking" className="nx-btn-primary">
            Записатись на прийом
          </Link>
        </div>
      </section>
    </main>
  )
}
