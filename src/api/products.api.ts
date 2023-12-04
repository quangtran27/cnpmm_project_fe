import { ApiResponse, PaginatedData, PaginatedRespone } from '@/types/api.type'
import { Product } from '@/types/products.type'
import axios from './axios-instance'

const productsApi = {
  getAll: async (paginatedData?: Omit<PaginatedData, 'totalPage'>) =>
    (
      await axios.get<ApiResponse<PaginatedRespone<Product[]>>>('product', {
        params: {
          ...paginatedData,
        },
      })
    ).data,
  get: async (id: string) => (await axios.get<ApiResponse<Product>>(`product/${id}`)).data,
  filter: async (option?: object) =>
    (
      await axios.get<ApiResponse<PaginatedRespone<Product[]>>>('product/search-filter', {
        params: { ...option },
      })
    ).data,
}

export default productsApi
