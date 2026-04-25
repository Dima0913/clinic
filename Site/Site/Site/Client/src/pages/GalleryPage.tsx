import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function GalleryPage() {
  const tabs = ['До/Після', 'Ми']
  const [activeTab, setActiveTab] = useState('До/Після')

  const beforeAfterItems = [
    {
      id: 1,
      before: '/images/gallery/before_1.jpg',
      after: '/images/gallery/after_1.jpg',
    },
    {
      id: 2,
      before: '/images/gallery/before_2.jpg',
      after: '/images/gallery/after_2.jpg',
    },
    {
      id: 3,
      before: '/images/gallery/before_3.jpg',
      after: '/images/gallery/after_3.jpg',
    },
    {
      id: 4,
      before: '/images/gallery/before_4.jpg',
      after: '/images/gallery/after_4.jpg',
    },
  ]

  const weItems = [
    { id: 1, image: '/images/one.jpg', title: 'Фото 1' },
    { id: 2, image: '/images/two.jpg', title: 'Фото 2' },
    { id: 3, image: '/images/doctor.jpg', title: 'Фото 3' },
    { id: 4, image: '/images/gallery/we_5.jpg', title: 'Фото 4' },
    { id: 5, image: '/images/gallery/we_6.jpg', title: 'Фото 5' },
  ]

  const currentItems = activeTab === 'До/Після' ? beforeAfterItems : weItems

  return (
    <main>
      <section className="nx-page-hero">
        <div className="nx-container">
          <p className="nx-section-label">Галерея</p>
          <h1>Фотогалерея</h1>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', marginTop: 24, gap: 10 }}>
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={activeTab === tab ? 'nx-btn-secondary' : undefined}
                style={
                  activeTab === tab
                    ? undefined
                    : {
                        padding: '10px 20px',
                        borderRadius: 999,
                        border: '1px solid var(--nx-line)',
                        background: 'var(--nx-pure)',
                        fontWeight: 700,
                        cursor: 'pointer',
                        color: 'var(--nx-text-muted)',
                      }
                }
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="nx-section" style={{ background: 'var(--nx-white)' }}>
        <div className="nx-container">
          <div className="nx-gallery-grid">
            {currentItems.map((item) => (
              'before' in item ? (
                <div
                  key={item.id}
                  style={{
                    background: 'white',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                    transition: 'transform 0.3s',
                  }}
                  className="gallery-item"
                >
                  <div className="nx-gallery-pair">
                  <div className="nx-gallery-imgbox">
                    <span className="nx-gallery-label">До</span>
                    <img 
                      src={item.before} 
                      alt="Фото до"
                      style={{width: '100%', height: '100%', objectFit: 'cover'}}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cmVjdCBmaWxsPSIjZjBmMGYwIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iIGZpbGw9IiM5OTkiIGZvbnQtc2l6ZT0iMTQiPkZvdG8gRE88L3RleHQ+PC9zdmc+';
                      }}
                    />
                  </div>
                  
                  <div className="nx-gallery-imgbox">
                    <span className="nx-gallery-label">Після</span>
                    <img 
                      src={item.after} 
                      alt="Фото після"
                      style={{width: '100%', height: '100%', objectFit: 'cover'}}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cmVjdCBmaWxsPSIjZThmNWU5IiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iIGZpbGw9IiMyZTdkMzIiIGZvbnQtc2l6ZT0iMTQiPkZvdG8gUcIz0YHRgtC1PC9tZXh0Pjwvc3ZnPg==';
                      }}
                    />
                  </div>

                  </div>
                </div>
              ) : (
                <div
                  key={item.id}
                  style={{
                    background: 'white',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                    transition: 'transform 0.3s',
                  }}
                  className="gallery-item"
                >
                  <div className="nx-gallery-single">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      style={{width: '100%', height: '100%', objectFit: 'cover'}}
                    />
                  </div>

                </div>
              )
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <h3 style={{ color: '#333', marginBottom: '20px' }}>Готові до змін?</h3>
            <p style={{ color: '#666', marginBottom: '30px' }}>
              Ми маємо багато років досвіду в лікуванні варикозу та судинних хвороб. 
              <br />
              Ваш результат - це наша гордість!
            </p>
            <Link to="/contacts#booking" className="nx-btn-primary">
              Записатись на консультацію
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

