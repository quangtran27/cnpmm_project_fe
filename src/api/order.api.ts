import { ApiResponse } from '@/types/api.type'
import { Order, OrderDetail } from '@/types/orders.type'
import { CreateOrderSchema } from '@/utils/validators/order.validator'
import { axiosPrivate } from './axios-instance'

const orderApi = {
  getAll: async () => (await axiosPrivate.get<ApiResponse<Order[]>>('/user/order')).data,
  get: async (id: string) => (await axiosPrivate.get<ApiResponse<OrderDetail>>(`/user/order/${id}`)).data,
  createOrder: async (data: CreateOrderSchema & { orderItemList: { productId: string; quantity: number }[] }) =>
    (await axiosPrivate.post('user/order', data)).data,
  cancel: async (id: string) => (await axiosPrivate.patch(`user/order/${id}`, { status: 'string' })).data,
}

export default orderApi
