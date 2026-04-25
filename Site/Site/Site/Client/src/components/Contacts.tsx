import { useState } from 'react'
import { createBooking } from '../services/api'

interface Service {
  id: number
  name: string
  description: string
  price: number
  displayOrder: number
}

interface ContactsProps {
  services: Service[]
}

export default function Contacts({ services }: ContactsProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    serviceId: 1,
    preferredDate: '',
    notes: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)
    
    try {
      await createBooking(formData)
      setSuccess(true)
      setFormData({
        name: '',
        phone: '',
        email: '',
        serviceId: 1,
        preferredDate: '',
        notes: ''
      })
      // Scroll to success message
      setTimeout(() => {
        document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } catch (err) {
      setError('Помилка при створенні запису. Спробуйте пізніше.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contacts" className="gray-bg">
      <div className="container">
        <h2>КОНТАКТНА ІНФОРМАЦІЯ</h2>
        
        {/* Contact Cards */}
        <div className="contact-cards">
          <div className="contact-card">
            <h3>📍 МІСЦЕЗНАХОДЖЕННЯ</h3>
            <p><strong>Рівне</strong></p>
            <p>вул. Генерала Безручка, 5а</p>
            <a href="https://g.co/kgs/hkLxDbR" target="_blank" rel="noopener noreferrer">
              Відкрити на карті →
            </a>
          </div>
          
          <div className="contact-card">
            <h3>📞 НОМЕР ТЕЛЕФОНУ</h3>
            <p><strong>Рівне</strong></p>
            <a href="tel:+380977824594">097 782 45 94</a>
            <p style={{marginTop: '10px', fontSize: '13px', color: '#999'}}>Працюємо: Пн-Пт 9:00-18:00</p>
          </div>
          
          <div className="contact-card">
            <h3>✉️ ЕЛЕКТРОННА ПОШТА</h3>
            <p>Для запитань та запису</p>
            <a href="mailto:savichoo80@gmail.com">savichoo80@gmail.com</a>
          </div>
        </div>

        {/* Map */}
        <div className="map-container" style={{marginBottom: '60px'}}>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2581.8437485734817!2d26.2426!3d50.6228!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x472b62a3b8f6a8ed%3A0xc6c8a0a0a0a0a0a0!2z0LLRg9C70LjRhtGPINCc0L7QvdGC0YDQsNGF0LjRhtGM0LrQvtC90LAsINCe0LTQtdGB0YHQutC40Lkg0LrQvtC80YHQutCw0Y8g0L7QsdC70LDRgdGC0YwsINCj0LrRgNCw0LjQvdCw!5e0!3m2!1suk!2sua!4v1700000000000"
            width="100%"
            height="100%"
            style={{border: 0}}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Мапа Життя без варикозу"
          ></iframe>
        </div>

        {/* Booking Form */}
        <div id="booking" style={{maxWidth: '700px', margin: '0 auto'}}>
          <h2 style={{marginBottom: '30px'}}>ЗАПИСАТИСЬ НА ПРИЙОМ</h2>
          
          {success && (
            <div className="success-message">
              <h4>✓ Дякуємо за запис!</h4>
              <p>Ми зв'яжемося з вами найближчим часом для підтвердження.</p>
            </div>
          )}
          
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="booking-form">
            <div className="form-group">
              <label htmlFor="name">ПІБ *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Ваше повне ім'я"
              />
            </div>
            
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px'}}>
              <div className="form-group">
                <label htmlFor="phone">Телефон *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="097 123 45 67"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                />
              </div>
            </div>
            
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px'}}>
              <div className="form-group">
                <label htmlFor="serviceId">Послуга *</label>
                <select
                  id="serviceId"
                  name="serviceId"
                  value={formData.serviceId}
                  onChange={handleChange}
                  required
                >
                  {services.map(service => (
                    <option key={service.id} value={service.id}>{service.name}</option>
                  ))}
                  <option value="1">Консультація</option>
                  <option value="2">Склеротерапія</option>
                  <option value="3">ЕВЛК 1 категорія</option>
                  <option value="4">ЕВЛК 2 категорія</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="preferredDate">Бажана дата *</label>
                <input
                  type="date"
                  id="preferredDate"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="notes">Примечания</label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                placeholder="Додаткова інформація (симптоми, побажання тощо)"
              ></textarea>
            </div>
            
            <button type="submit" className="btn-main" disabled={loading} style={{width: '100%'}}>
              {loading ? 'Відправка...' : 'Записатись на прийом'}
            </button>
            
            <p style={{textAlign: 'center', marginTop: '15px', fontSize: '13px', color: '#999'}}>
              Натискаючи кнопку, ви погоджуєтесь на обробку персональних даних
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}

