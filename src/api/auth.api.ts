import axios from '@/api/axios-instance'
import { ApiResponse } from '@/types/api.type'
import { LoginData } from '@/types/auth.type'
import { ForgotPasswordSchema, LoginSchema } from '@/utils/validators/auth.validator'

const authApi = {
  login: async (data: LoginSchema) => (await axios.post<ApiResponse<LoginData>>('auth/login', data)).data,
  logout: () => {},
  forgotPassword: async (data: ForgotPasswordSchema) =>
    (await axios.patch<ApiResponse<undefined>>(`auth/forgot-password?email=${data.email}`)).data,
}

export default authApi
