import { Product } from './products'
import { User } from './user'

type OrderStatus = 'Đã tạo' | 'Đã xác nhận' | 'Đang giao' | 'Đã giao' | 'Đã hủy'

export interface Order {
  id: string
  user: User
  created: string
  updated: string
  status: OrderStatus
  discount: number
  total: number
}

export interface OrderItem {
  id: string
  order: Order
  product: Product
  productName: string
  productPrice: number
  quantity: number
}
