import axios from '@/api/axios-instance'
import { ApiResponse } from '@/types/api.type'
import { Brand } from '@/types/products.type'

export const brandsApi = {
  getAll: async () => (await axios.get<ApiResponse<Brand[]>>('brand')).data,
}

export default brandsApi
