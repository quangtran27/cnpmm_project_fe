import { OrderStatus } from '@/types/orders.type'

export function getOrderStatusClass(status: OrderStatus): string {
  switch (status) {
    case OrderStatus.created:
      return 'text-gray-700'
    case OrderStatus.confirmed:
      return 'text-warning'
    case OrderStatus.delivering:
      return 'text-info'
    case OrderStatus.delivered:
      return 'text-success'
    case OrderStatus.cancelled:
      return 'text-error'
  }
}
