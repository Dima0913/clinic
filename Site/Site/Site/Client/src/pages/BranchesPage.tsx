export default function BranchesPage() {
  return (
    <main>
      <section className="nx-page-hero">
        <div className="nx-container">
          <p className="nx-section-label">Філії</p>
          <h1>Наші філії</h1>
          <p>Життя без варикозу у Рівному та прийом у м. Сарни — МЦ «ВІЗІЯ».</p>
        </div>
      </section>

      <section className="nx-section">
        <div className="nx-container">
          <div className="nx-branches-grid">
            {/* Філія Рівне */}
            <div className="nx-branch-card">
              <p className="nx-section-label" style={{ marginBottom: 10 }}>
                Рівне
              </p>
              <h2 style={{ fontSize: 22, marginBottom: 18 }}>Головна філія</h2>

              <div className="nx-contact-item">
                <div className="nx-contact-icon" aria-hidden>
                  📍
                </div>
                <div>
                  <strong>Адреса</strong>
                  <p>
                    вул. Генерала Безручка, 5а
                    <br />
                    58000, Рівне, Україна
                  </p>
                </div>
              </div>

              <div className="nx-contact-item">
                <div className="nx-contact-icon" aria-hidden>
                  📞
                </div>
                <div>
                  <strong>Телефон</strong>
                  <p>
                    <a href="tel:+380977824594">097 782 45 94</a>
                  </p>
                </div>
              </div>

              <div className="nx-contact-item" style={{ borderBottom: 'none', paddingBottom: 0 }}>
                <div className="nx-contact-icon" aria-hidden>
                  ⏰
                </div>
                <div>
                  <strong>Режим роботи</strong>
                  <p>
                    Пн-Пт: 12:30-17:00
                    <br />
                    Сб: 09:00 - 13:00
                    <br />
                    Нд: вихідний
                  </p>
                </div>
              </div>

              <a
                href="https://www.google.com/maps/search/?api=1&query=%D0%A0%D1%96%D0%B2%D0%BD%D0%B5%2C+%D0%B2%D1%83%D0%BB.+%D0%93%D0%B5%D0%BD%D0%B5%D1%80%D0%B0%D0%BB%D0%B0+%D0%91%D0%B5%D0%B7%D1%80%D1%83%D1%87%D0%BA%D0%B0%2C+5%D0%B0"
                target="_blank"
                rel="noopener noreferrer"
                className="nx-btn-primary"
                style={{ marginTop: 18 }}
              >
                Переглянути на картах
              </a>
            </div>

            {/* Філія Сарни */}
            <div className="nx-branch-card">
              <p className="nx-section-label" style={{ marginBottom: 10 }}>
                Сарни
              </p>
              <h2 style={{ fontSize: 22, marginBottom: 18 }}>МЦ «ВІЗІЯ»</h2>

              <div className="nx-contact-item">
                <div className="nx-contact-icon" aria-hidden>
                  📍
                </div>
                <div>
                  <strong>Адреса</strong>
                  <p>
                    вул. Я.&nbsp;Мудрого, 5
                    <br />
                    м. Сарни
                  </p>
                </div>
              </div>

              <div className="nx-contact-item" style={{ borderBottom: 'none', paddingBottom: 0 }}>
                <div className="nx-contact-icon" aria-hidden>
                  📞
                </div>
                <div>
                  <strong>Телефон</strong>
                  <p>
                    <a href="tel:+380673287298">067 328 72 98</a>
                  </p>
                </div>
              </div>

              <a
                href="https://www.google.com/maps/search/?api=1&query=%D1%81.%D0%A1%D0%B0%D1%80%D0%BD%D0%B8+%D0%B2%D1%83%D0%BB.+%D0%AF%D1%80%D0%BE%D1%81%D0%BB%D0%B0%D0%B2%D0%B0+%D0%9C%D1%83%D0%B4%D1%80%D0%BE%D0%B3%D0%BE+5"
                target="_blank"
                rel="noopener noreferrer"
                className="nx-btn-primary"
                style={{ marginTop: 18 }}
              >
                Переглянути на картах
              </a>
            </div>
          </div>

          {/* Карти філій */}
          <div style={{ marginTop: '60px' }}>
            <div className="nx-section-head nx-section-head--center" style={{ marginBottom: 30 }}>
              <h2>Наші філії на карті</h2>
            </div>
            <div className="nx-branches-map-grid">
              {/* Рівне */}
              <div>
                <h3 style={{ textAlign: 'center', marginBottom: '15px' }}>Рівне</h3>
                <iframe
                  src="https://www.google.com/maps?q=%D0%A0%D1%96%D0%B2%D0%BD%D0%B5%2C+%D0%B2%D1%83%D0%BB.+%D0%93%D0%B5%D0%BD%D0%B5%D1%80%D0%B0%D0%BB%D0%B0+%D0%91%D0%B5%D0%B7%D1%80%D1%83%D1%87%D0%BA%D0%B0%2C+5%D0%B0&output=embed"
                  width="100%"
                  className="nx-branches-map"
                  allowFullScreen={true}
                  loading="lazy"
                ></iframe>
              </div>
              {/* Сарни */}
              <div>
                <h3 style={{ textAlign: 'center', marginBottom: '15px' }}>м. Сарни</h3>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2548.0!2d26.6075!3d51.3232!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x472508a8b8b8b8b8%3A0x1234567890abcdef!2s%D1%81.%D0%A1%D0%B0%D1%80%D0%BD%D0%B8%2C%20%D0%B2%D1%83%D0%BB.%20%D0%AF%D1%80%D0%BE%D1%81%D0%BB%D0%B0%D0%B2%D0%B0%20%D0%9C%D1%83%D0%B4%D1%80%D0%BE%D0%B3%D0%BE%2C%205!5e0!3m2!1suk!2sua!4v1725153640000"
                  width="100%"
                  className="nx-branches-map"
                  allowFullScreen={true}
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

