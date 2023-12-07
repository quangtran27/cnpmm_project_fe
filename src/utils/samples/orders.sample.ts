import { OrderDetail, OrderPayment, OrderStatus } from '@/types/orders.type'

export const emptyOrderDetail: OrderDetail = {
  id: '',
  createdAt: '',
  lastUpdatedAt: null,
  status: OrderStatus.created,
  total: 0,
  receiverName: '',
  receiverPhone: '',
  address: '',
  payment: OrderPayment.cod,
  isPaid: false,
  orderItemList: [],
}
