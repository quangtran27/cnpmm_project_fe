export enum OrderStatus {
  created = 'Đã tạo',
  confirmed = 'Đã xác nhận',
  delivering = 'Đang giao',
  delivered = 'Đã giao',
  cancelled = 'Đã hủy',
}
export enum OrderPayment {
  cod = 'COD',
  banking = 'banking',
}

export type Order = {
  id: string
  orderItemList: OrderItem[]
  status: OrderStatus
  total: number
}

export type OrderDetail = {
  id: string
  createdAt: string
  lastUpdatedAt: null
  status: OrderStatus
  total: number
  receiverName: string
  receiverPhone: string
  address: string
  payment: OrderPayment
  isPaid: boolean
  orderItemList: OrderItem[]
}

export type OrderItem = {
  id: string
  productId: string
  productName: string
  productImage: string
  productPrice: number
  quantity: number
}
