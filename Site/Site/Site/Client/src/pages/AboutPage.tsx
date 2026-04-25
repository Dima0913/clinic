import { Link } from 'react-router-dom'

export default function AboutPage() {
  return (
    <main>
      <section className="nx-page-hero">
        <div className="nx-container">
          <p className="nx-section-label">Про нас</p>
          <h1>Про лікаря та центр</h1>
          <p>Життя без варикозу у Рівному — вузька спеціалізація на судинній хірургії та флебології.</p>
        </div>
      </section>

      <section className="nx-section">
        <div className="nx-container">
          <div className="nx-split">
            <div
              style={{
                borderRadius: 'var(--nx-radius-xl)',
                overflow: 'hidden',
                border: '1px solid var(--nx-line)',
                boxShadow: 'var(--nx-shadow-soft)',
                maxHeight: 520,
              }}
            >
              <img src="/images/doctor.jpg" alt="Савич Олексій Олегович" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div>
              <h2 style={{ fontSize: 26, marginBottom: 12 }}>Савич Олексій Олегович</h2>
              <p style={{ fontWeight: 700, color: 'var(--nx-blue)', marginBottom: 20 }}>
                Судинний хірург, флеболог, лікар УЗД, дитячий хірург
              </p>
              <p style={{ color: 'var(--nx-text-muted)', lineHeight: 1.75, marginBottom: 16 }}>
                Випускник ТДМУ ім. І.&nbsp;Я.&nbsp;Горбачевського, факультет «Лікувальна справа». У 2017 році закінчив
                спеціалізацію з ультразвукової діагностики на базі ЛДМУ ім.&nbsp;Данила Галицького. У 2020 році
                навчався судинній хірургії на базі ЛДМУ ім.&nbsp;Данила Галицького, факультет післядипломної освіти в
                професора Кобзи І.&nbsp;І., проходячи стажування та навчання в приватних і державних клініках Києва та
                Львова.
              </p>
              <p style={{ color: 'var(--nx-text-muted)', lineHeight: 1.75, marginBottom: 16 }}>
                Протягом п’яти років займаюся ендовенозною лазерною коагуляцією (ЕВЛК) варикозно змінених вен нижніх
                кінцівок. За період роботи маю успішний досвід виконання близько{' '}
                <strong style={{ color: 'var(--nx-text)' }}>700 оперативних втручань</strong> з приводу варикозу
                нижніх кінцівок методом ЕВЛК та склеротерапії під контролем УЗД.
              </p>
              <p style={{ color: 'var(--nx-text-muted)', lineHeight: 1.75 }}>
                Лікую варикоз нижніх кінцівок методом ендовенозної лазерної коагуляції (абляції) та склеротерапії.
                Допоможу позбутися варикозу та повернути легкість у ногах.
              </p>
              <div style={{ marginTop: 24 }}>
                <a href="tel:+380977824594" className="nx-btn-primary">
                  Зв’язатись: 097 782 45 94
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="nx-section" style={{ background: 'var(--nx-white)' }}>
        <div className="nx-container">
          <div className="nx-section-head nx-section-head--center">
            <p className="nx-section-label">Навчання</p>
            <h2>Освіта та стажування</h2>
          </div>
          <div className="nx-glass-card" style={{ maxWidth: 720, margin: '0 auto' }}>
            <ul style={{ listStyle: 'none' }}>
              <li style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--nx-line)' }}>
                <span className="nx-bullet" style={{ marginTop: 8 }} />
                Факультет «Лікувальна справа» ТДМУ ім.&nbsp;І.&nbsp;Я.&nbsp;Горбачевського
              </li>
              <li style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--nx-line)' }}>
                <span className="nx-bullet" style={{ marginTop: 8 }} />
                Інтернатура «Дитяча хірургія» ЛДМУ ім.&nbsp;Данила Галицького
              </li>
              <li style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--nx-line)' }}>
                <span className="nx-bullet" style={{ marginTop: 8 }} />
                Спеціалізація з ультразвукової діагностики ЛДМУ ім.&nbsp;Данила Галицького
              </li>
              <li style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--nx-line)' }}>
                <span className="nx-bullet" style={{ marginTop: 8 }} />
                Спеціалізація «Судинна хірургія» ЛДМУ ім.&nbsp;Данила Галицького
              </li>
              <li style={{ display: 'flex', gap: 12, padding: '12px 0' }}>
                <span className="nx-bullet" style={{ marginTop: 8 }} />
                Навчання та стажування в клініках м.&nbsp;Києва та м.&nbsp;Львова
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="nx-section nx-band-dark">
        <div className="nx-container" style={{ textAlign: 'center' }}>
          <h2 style={{ color: '#fff', fontSize: 24, marginBottom: 12 }}>Життя без варикозу можливе</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 560, margin: '0 auto 24px', lineHeight: 1.65 }}>
            Позбудьтеся варикозних вен без класичного хірургічного розрізу. Запишіться на прийом — підберемо метод
            лікування індивідуально.
          </p>
          <Link to="/contacts#booking" className="nx-btn-primary">
            Записатись на прийом
          </Link>
        </div>
      </section>
    </main>
  )
}
