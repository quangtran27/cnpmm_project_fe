import { OrderDetail, OrderStatus } from '@/types/orders.type'

export const emptyOrderDetail: OrderDetail = {
  id: '',
  createdAt: '',
  lastUpdatedAt: null,
  status: OrderStatus.created,
  total: 0,
  receiverName: '',
  receiverPhone: '',
  address: '',
  payment: '',
  isPaid: false,
  orderItemList: [],
}
