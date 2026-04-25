import { Link } from 'react-router-dom'

interface Service {
  id: number
  name: string
  description: string
  price: number
  // discountPercentage?: number
  imageUrl?: string
  displayOrder: number
}

interface ServicesProps {
  services: Service[]
  showPrice?: boolean
}

export default function Services({ services, showPrice = false }: ServicesProps) {
  const orderedServices = [...services].sort((a, b) => a.displayOrder - b.displayOrder)

  return (
    <section id="services" className="gray-bg">
      <div className="container">
        <h2>НАШІ ПОСЛУГИ</h2>
        
        {/* Services Grid - Big Cards */}
        <div className="home-services-grid">
          {orderedServices.map(service => (
            <Link to={`/contacts#booking?serviceId=${service.id}`} key={service.id} className="home-service-card-link">
              <div className="home-service-card">
                <div className="home-service-icon">
                  🏥
                </div>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
                <div className="home-service-footer">
                  <span className="btn-main">Записатись на прийом</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Card */}
        <div className="card services-cta-card" style={{marginTop: '40px'}}>
          <div className="card-content">
            <h3>Не відкладайте лікування варикозу</h3>
            <p>
              Ми цінуємо вашу довіру і піклуємося про результат, надаючи лише якісні медичні послуги.
              Запишіться на консультацію вже сьогодні!
            </p>
            <Link to="/contacts#booking" className="btn-main services-cta-btn">
              Записатись на прийом
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

