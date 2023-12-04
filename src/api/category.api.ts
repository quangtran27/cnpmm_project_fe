import axios from '@/api/axios-instance'
import { ApiResponse } from '@/types/api.type'
import { Category } from '@/types/products.type'

const categoriesApi = {
  getAll: async () => (await axios.get<ApiResponse<Category[]>>('category')).data,
  get: async (id: string, params?: object) =>
    (await axios.get<ApiResponse<Category>>(`category/${id}`, { params: { ...params } })).data,
  getCategoryColors: async (id: string) =>
    (await axios.get<ApiResponse<string[]>>(`product/color/by-category`, { params: { categoryId: id } })).data,
}

export default categoriesApi
