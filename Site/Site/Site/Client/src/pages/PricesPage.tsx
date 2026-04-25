import { Link } from 'react-router-dom'
import { staticPriceRows } from '../data/staticPrices'

export default function PricesPage() {

  return (
    <main>
      <section className="nx-page-hero">
        <div className="nx-container">
          <p className="nx-section-label">Прозорі умови</p>
          <h1>Ціни</h1>
          <p>
            Актуальний перелік процедур медичної клініки. Деталі та фінальний план лікування — після консультації та
            УЗД.
          </p>
        </div>
      </section>

      <section className="nx-section">
        <div className="nx-container">
          <div className="nx-section-head nx-section-head--center" style={{ marginBottom: 28 }}>
            <h2>Перелік медичних процедур</h2>
            <p style={{ color: 'var(--nx-text-muted)' }}>
              Вартість зазначена орієнтовно; уточнюйте на прийомі.
            </p>
          </div>

          <div className="nx-table-wrap">
            <table className="nx-table">
              <thead>
                <tr>
                  <th>№</th>
                  <th>Процедура</th>
                  <th>Вартість</th>
                </tr>
              </thead>
              <tbody>
                {staticPriceRows.map((row, i) => (
                  <tr key={row.name}>
                    <td className="mono" style={{ color: 'var(--nx-caption)' }}>
                      {i + 1}
                    </td>
                    <td style={{ fontWeight: 600, color: 'var(--nx-text)' }}>{row.name}</td>
                    <td className="mono nx-price">{row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p style={{ marginTop: 24, fontSize: 14, color: 'var(--nx-text-muted)', lineHeight: 1.65 }}>
            Позбудьтеся варикозних вен без хірургічного втручання. Метод лазерної абляції — швидко та ефективно.
            Телефон:{' '}
            <a href="tel:+380977824594" style={{ fontWeight: 700, color: 'var(--nx-blue-deep)' }}>
              097 782 45 94
            </a>
            .
          </p>

          <div style={{ marginTop: 40, textAlign: 'center' }}>
            <Link to="/contacts#booking" className="nx-btn-primary">
              Записатись на прийом
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
