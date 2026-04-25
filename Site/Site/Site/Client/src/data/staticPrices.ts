export type StaticPriceRow = {
  name: string
  price: string
  note?: string
}

export const staticPriceRows: StaticPriceRow[] = [
  { name: 'Склеротерапія', price: '6 500 грн' },
  { name: 'ЕВЛК 1 категорія', price: '12 500 грн' },
  { name: 'ЕВЛК 2 категорія', price: '15 000 грн' },
  { name: 'ЕВЛК 3 категорія', price: '19 000 грн' },
  { name: 'ЕВЛК 4 категорія', price: '22 500 грн' },
  { name: 'ЕВЛК 5 категорія', price: '26 500 грн' },
  { name: 'ЕВЛК 6 категорія', price: '33 000 грн' },
  { name: 'Етап після операції (протягом 1 року)', price: '2 500 грн' },
  { name: 'УЗД двох ніг', price: '600 грн' },
  { name: 'Консультація судинного хірурга', price: '400 грн' },
]
