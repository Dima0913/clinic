import { Link } from 'react-router-dom'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="nx-footer">
      <div className="nx-container">
        <div className="nx-footer-grid">
          <div className="nx-footer-brand">
            <div className="nx-brand" style={{ marginBottom: 20 }}>
              <div className="nx-logo">
                <img src="/logo.png" alt="" width={40} height={40} />
              </div>
              <div className="nx-brand-text">
                <span className="nx-brand-name" style={{ color: '#fff' }}>
                  ЖИТТЯ без варикозу
                </span>
                <span className="nx-brand-tag">Рівне</span>
              </div>
            </div>
            <p>
              Лікування варикозу методом ендовенозної лазерної коагуляції (ЕВЛК) та склеротерапії під контролем
              УЗД. ЖИТТЯ без варикозу можливе.
            </p>
            <div className="nx-footer-social">
              <a
                href="https://www.instagram.com/dr.oleksii.savych_flebolog"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                IG
              </a>
              <a href="tel:+380977824594" aria-label="Телефон Рівне">
                ☎
              </a>
            </div>
          </div>

          <div>
            <h4>Навігація</h4>
            <ul>
              <li>
                <Link to="/services">Послуги</Link>
              </li>
              <li>
                <Link to="/about">Про нас</Link>
              </li>
              <li>
                <Link to="/branches">Філії</Link>
              </li>
              <li>
                <Link to="/gallery">Фотогалерея</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4>Корисне</h4>
            <ul>
              <li>
                <Link to="/prices">Ціни</Link>
              </li>
              <li>
                <Link to="/contacts">Контакти</Link>
              </li>
              <li>
                <Link to="/contacts#booking">Запис на прийом</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4>Контакти</h4>
            <ul>
              <li>
                <a href="tel:+380977824594">097 782 45 94</a> · Рівне
              </li>
              <li>
                <a href="tel:+380673287298">067 328 72 98</a> · Сарни
              </li>
              <li>вул. Генерала Безручка, 5а, Рівне</li>
              <li>МЦ «ВІЗІЯ», вул. Я. Мудрого, 5, м. Сарни</li>
            </ul>
          </div>
        </div>

        <div className="nx-footer-bottom">
          <span>© {year} ЖИТТЯ без варикозу. Усі права захищені.</span>
          <span>
            <a href="mailto:savichoo80@gmail.com">savichoo80@gmail.com</a>
          </span>
        </div>
      </div>
    </footer>
  )
}
