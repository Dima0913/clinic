import BookingForm from '../components/BookingForm'
import { IconClock, IconMail, IconMap, IconPhone } from '../components/Icons'
import type { Service } from '../types'

type ContactsPageProps = {
  services: Service[]
}

export default function ContactsPage({ services }: ContactsPageProps) {
  return (
    <main>
      <section className="nx-page-hero">
        <div className="nx-container">
          <p className="nx-section-label">Зв’язок</p>
          <h1>Контакти</h1>
          <p>Рівне та Сарни — оберіть зручну філію або залиште заявку на запис онлайн.</p>
        </div>
      </section>

      <section className="nx-section">
        <div className="nx-container nx-contact-row">
          <div>
            <div className="nx-section-head nx-section-head--center" style={{ marginBottom: 28 }}>
              <h2>Як зв’язатися</h2>
              <p style={{ color: 'var(--nx-text-muted)' }}>
                Життя без варикозу можливе. Звертайтесь — підкажемо підготовку до процедур та запишемо на прийом.
              </p>
            </div>

            <div className="nx-contact-item">
              <div className="nx-contact-icon">
                <IconMap className="nx-icon-24" />
              </div>
              <div>
                <strong>Рівне</strong>
                <p>вул. Генерала Безручка, 5а</p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=%D0%A0%D1%96%D0%B2%D0%BD%D0%B5%2C+%D0%B2%D1%83%D0%BB.+%D0%93%D0%B5%D0%BD%D0%B5%D1%80%D0%B0%D0%BB%D0%B0+%D0%91%D0%B5%D0%B7%D1%80%D1%83%D1%87%D0%BA%D0%B0%2C+5%D0%B0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nx-btn-ghost"
                  style={{ marginTop: 8 }}
                >
                  Відкрити на картах
                </a>
              </div>
            </div>

            <div className="nx-contact-item">
              <div className="nx-contact-icon">
                <IconPhone className="nx-icon-24" />
              </div>
              <div>
                <strong>Телефон (Рівне)</strong>
                <p>
                  <a href="tel:+380977824594">097 782 45 94</a>
                </p>
              </div>
            </div>

            <div className="nx-contact-item">
              <div className="nx-contact-icon">
                <IconMap className="nx-icon-24" />
              </div>
              <div>
                <strong>Сарни · МЦ «ВІЗІЯ»</strong>
                <p>вул. Я.&nbsp;Мудрого, 5</p>
              </div>
            </div>

            <div className="nx-contact-item">
              <div className="nx-contact-icon">
                <IconPhone className="nx-icon-24" />
              </div>
              <div>
                <strong>Телефон (Сарни)</strong>
                <p>
                  <a href="tel:+380673287298">067 328 72 98</a>
                </p>
              </div>
            </div>

            <div className="nx-contact-item">
              <div className="nx-contact-icon">
                <IconMail className="nx-icon-24" />
              </div>
              <div>
                <strong>Електронна пошта</strong>
                <p>
                  <a href="mailto:savichoo80@gmail.com">savichoo80@gmail.com</a>
                </p>
              </div>
            </div>

            <div className="nx-contact-item">
              <div className="nx-contact-icon">
                <IconClock className="nx-icon-24" />
              </div>
              <div>
                <strong>Графік</strong>
                <p>Уточнюйте за телефоном — гнучкий запис без зайвих черг.</p>
              </div>
            </div>
          </div>

          <div className="nx-map">
            <iframe
              title="Життя без варикозу, Рівне"
              src="https://www.google.com/maps?q=%D0%A0%D1%96%D0%B2%D0%BD%D0%B5%2C+%D0%B2%D1%83%D0%BB.+%D0%93%D0%B5%D0%BD%D0%B5%D1%80%D0%B0%D0%BB%D0%B0+%D0%91%D0%B5%D0%B7%D1%80%D1%83%D1%87%D0%BA%D0%B0%2C+5%D0%B0&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <section className="nx-section" style={{ background: 'var(--nx-white)' }}>
        <div className="nx-container" style={{ maxWidth: 560 }}>
          <div className="nx-section-head nx-section-head--center">
            <p className="nx-section-label">Онлайн-запис</p>
            <h2>Запис на прийом</h2>
            <p style={{ color: 'var(--nx-text-muted)' }}>Заповніть форму — ми передзвонимо для підтвердження часу.</p>
          </div>
          <div className="nx-panel" style={{ padding: 'clamp(24px,4vw,36px)' }}>
            <BookingForm services={services} />
          </div>
        </div>
      </section>
    </main>
  )
}
