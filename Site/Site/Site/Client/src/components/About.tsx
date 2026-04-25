export default function About() {
  return (
    <section id="about" className="gray-bg">
      <div className="container">
        <h2>ПРО НАС</h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '40px',
          alignItems: 'start'
        }}>
          <div>
            <h3 style={{fontSize: '24px', marginBottom: '20px', color: '#27ae60'}}>
              Життя без варикозу — ваш шлях до здорових ніжок
            </h3>
            <p style={{marginBottom: '15px', lineHeight: '1.8', color: '#555'}}>
              Життя без варикозу у Рівному спеціалізується на лазерному лікуванні варикозу,
              трофічних виразок, склеротерапії, хірургії та УЗД дослідженні всіх органів та систем організму.
            </p>
            <p style={{marginBottom: '20px', lineHeight: '1.8', color: '#555'}}>
              Ми перші на Західній Україні почали застосовувати лазерне лікування варикозу пункційним методом. 
              
            </p>
            
            {/* Stats */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '20px',
              marginTop: '30px'
            }} className="nx-about-stats">
              <div style={{
                background: 'white',
                padding: '20px',
                borderRadius: '12px',
                textAlign: 'center',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
              }}>
                <div style={{fontSize: '32px', fontWeight: '800', color: '#27ae60', fontFamily: 'Montserrat'}}>10+</div>
                <div style={{fontSize: '14px', color: '#777'}}>років досвіду</div>
              </div>
              <div style={{
                background: 'white',
                padding: '20px',
                borderRadius: '12px',
                textAlign: 'center',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
              }}>
                
                
              </div>
            </div>
          </div>

          {/* Doctor Card */}
          <div className="doctor-card">
            <div style={{
              background: 'linear-gradient(135deg, #27ae60, #2ecc71)',
              padding: '30px',
              textAlign: 'center',
              color: 'white'
            }}>
              <div style={{
                width: '120px',
                height: '120px',
                background: 'white',
                borderRadius: '50%',
                margin: '0 auto 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '48px'
              }}>
                👨‍⚕️
              </div>
              <h3 style={{color: 'white', fontSize: '22px', marginBottom: '5px'}}>Савич Олексій Олегович</h3>
              <p style={{opacity: '0.9', fontSize: '14px'}}>Судинний хірург, Флеболог</p>
            </div>
            <div className="doctor-info">
              <p className="description">
                Проводить успішне лікування варикозу та інших судинних захворювань з 2008 року.
                Застосовує найсучасніші методики лазерного лікування.
              </p>
              <div className="doctor-qualifications">
                <h4>Освіта та кваліфікація</h4>
                <ul>
                  <li>ТДМУ ім. І. Я. Горбачевського - "Лікувальна справа"</li>
                  <li>Інтернатура "Дитяча хірургія" ЛДМУ ім. Данила Галицького</li>
                  <li>Спеціалізація з ультразвукової діагностики</li>
                  <li>Спеціалізація "Судинна хірургія"</li>
                  <li>Навчання та стажування в клініках м. Києва та Львова</li>
                  <li>10 років досвіду в лазерному лікуванні варикозу</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div style={{marginTop: '60px'}}>
          <h3 style={{textAlign: 'center', fontSize: '28px', marginBottom: '40px'}}>Чому обирають нас</h3>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">✓</div>
              <h3>Безпека</h3>
              <p>Всі процедури проводяться з дотриманням найвищих стандартів безпеки</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">★</div>
              <h3>Якість</h3>
              <p>Використовуємо лише сертифіковане обладнання та матеріали</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">❤</div>
              <h3>Індивідуальний підхід</h3>
              <p>Кожен пацієнт отримує персоналізовану програму лікування</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏥</div>
              <h3>Комфорт</h3>
              <p>Зручний запис, очікування без черги, приємна атмосфера</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

