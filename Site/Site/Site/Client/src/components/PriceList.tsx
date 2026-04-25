interface Service {
  id: number
  name: string
  description: string
  price: number
  discountPercentage?: number
  imageUrl?: string
  displayOrder: number
}

interface PriceListProps {
  services: Service[]
}

export default function PriceList({ services }: PriceListProps) {
// Discounts removed


  return (
    <section id="prices" className="white-bg">
      <div className="container">
        <h2>ПРАЙС-ЛИСТ</h2>
        <table className="price-table">
          <thead>
            <tr>
              <th>№</th>
              <th>Процедура</th>
              <th>Ціна</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, index) => (
              <tr key={service.id}>
                <td>{index + 1}</td>
                <td>{service.name}</td>
                <td>
                  {service.price} грн

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
