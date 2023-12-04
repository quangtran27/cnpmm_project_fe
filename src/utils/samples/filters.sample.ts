import { Option } from '@/types/filter.type'

export const priceOptions: Option[] = [
  {
    label: 'Dưới 500.000đ',
    value: 'Price/max|500000',
  },
  {
    label: 'Từ 500.000đ - 4 triệu',
    value: 'Price/min|500000,Price/max|4000000',
  },
  {
    label: 'Từ 4 - 10 triệu',
    value: 'Price/min|4000000,Price/max|10000000',
  },
  {
    label: 'Từ 10 - 25 triệu',
    value: 'Price/min|10000000,Price/max|25000000',
  },
  {
    label: 'Từ 25 - 40 triệu',
    value: 'Price/min|25000000,Price/max|40000000',
  },
  {
    label: 'Trên 40 triệu',
    value: 'Price/min|40000000',
  },
]

export const sortOptions: Option[] = [
  {
    label: 'Giá thấp → cao',
    value: 'price_asc',
  },
  {
    label: 'Giá cao → thấp',
    value: 'price_desc',
  },
  {
    label: 'Bán chạy nhất',
    value: 'sold',
  },
]
