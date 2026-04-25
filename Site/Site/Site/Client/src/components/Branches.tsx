import { Link } from 'react-router-dom'

export default function Branches() {
  return (
    <section id="branches" className="white-bg">
      <div className="container">
        <h2>НАШІ ФІЛІЇ</h2>
        
        <div className="grid" style={{maxWidth: '900px', margin: '0 auto'}}>
          {/* Rivne Branch */}
          <div className="branch-card">
            <div className="branch-header">
              <h3>РІВНЕ</h3>
              <p style={{opacity: 0.9, marginTop: '5px'}}>Головний офіс</p>
            </div>
            <div className="branch-body">
              <p>
                <span className="icon">📍</span>
                <strong>Адреса:</strong> вул. Генерала Безручка, 5а
              </p>
              <p>
                <span className="icon">📞</span>
                <strong>Телефон:</strong> <a href="tel:+380977824594">097 782 45 94</a>
              </p>
              <p>
                <span className="icon">🕐</span>
                <strong>Графік:</strong> Пн-Пт 9:00-18:00
              </p>
              <p>
                <span className="icon">👨‍⚕️</span>
                <strong>Лікар:</strong> Савич О.О.
              </p>
              <a 
                href="https://g.co/kgs/hkLxDbR" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-secondary" 
                style={{display: 'inline-block', marginTop: '15px'}}
              >
                Відкрити на карті
              </a>
            </div>
          </div>

          {/* Sarny Branch */}
          <div className="branch-card">
            <div className="branch-header" style={{background: 'linear-gradient(135deg, #3498db, #2980b9)'}}>
              <h3>САРНИ</h3>
              <p style={{opacity: 0.9, marginTop: '5px'}}>МЦ "ВІЗІЯ"</p>
            </div>
            <div className="branch-body">
              <p>
                <span className="icon">🏥</span>
                <strong>Назва:</strong> МЦ «ВІЗІЯ»
              </p>
              <p>
                <span className="icon">📍</span>
                <strong>Адреса:</strong> вул. Я. Мудрого, 5
              </p>
              <p>
                <span className="icon">📞</span>
                <strong>Телефон:</strong> <a href="tel:+380673287298">067 328 72 98</a>
              </p>
              <p>
                <span className="icon">🕐</span>
                <strong>Графік:</strong> За попереднім записом
              </p>
              <p>
                <span className="icon">👨‍⚕️</span>
                <strong>Лікар:</strong> Савич О.О.
              </p>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div style={{
          marginTop: '50px',
          textAlign: 'center',
          padding: '30px',
          background: '#f8f9fa',
          borderRadius: '12px'
        }}>
          <h3 style={{marginBottom: '15px', color: '#27ae60'}}>Запис на прийом</h3>
          <p style={{marginBottom: '20px', color: '#666'}}>
            Ви можете записатись на консультацію в будь-яку з наших філій за телефонами, вказаними вище,
            або через форму запису на сайті.
          </p>
          <Link to="/contacts#booking" className="btn-main">
            Записатись на прийом
          </Link>
        </div>
      </div>
    </section>
  )
}

