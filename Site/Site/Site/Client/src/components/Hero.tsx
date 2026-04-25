import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="nx-hero" aria-label="Головний банер">
      <div className="nx-hero-bg nx-hero-bg--local" />
      <div className="nx-hero-grid" aria-hidden />
      <div className="nx-scan-line" aria-hidden />
      <div className="nx-ecg" aria-hidden />
      <div className="nx-particles" aria-hidden>
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className="nx-hero-inner">
        <div className="nx-hero-card">
          <p className="nx-kicker">Життя без варикозу · Рівне та Сарни</p>
          <h1>Життя без варикозу у Рівному</h1>
          <p className="nx-hero-lead">
            Позбудьтеся варикозних вен без хірургічного втручання. Метод лазерної абляції (ЕВЛК) — швидко та
            ефективно. Допоможу позбутись варикозу та повернути легкість у ногах.
          </p>
          <div className="nx-hero-actions">
            <Link to="/contacts#booking" className="nx-btn-primary">
              Записатись на прийом
            </Link>
            <Link to="/services" className="nx-btn-secondary">
              Наші послуги
            </Link>
          </div>
          <dl className="nx-hero-meta">
            <div>
              <dt>Досвід ЕВЛК</dt>
              <dd className="mono">10 років</dd>
            </div>
            <div>
              <dt>Телефон</dt>
              <dd className="mono" style={{ fontSize: 15 }}>
                097 782 45 94
              </dd>
            </div>
          </dl>
        </div>

        <div className="nx-hero-quote-side" aria-label="Цитата">
          <p className="nx-hero-quote-big">
            Життя без варикозу <span className="nx-hero-quote-accent">можливе</span>
          </p>
        </div>
      </div>
    </section>
  )
}
