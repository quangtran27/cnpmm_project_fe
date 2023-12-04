import { ApiResponse } from '@/types/api.type'
import { User } from '@/types/user.type'
import { RegisterSchema, UpdateUserPasswordSchema, UpdateUserProfileSchema } from '@/utils/validators/user.validator'
import axios, { axiosPrivate } from './axios-instance'
const userApi = {
  createUser: async (registerUser: RegisterSchema) => (await axios.post('auth/register', { ...registerUser })).data,
  getUser: async () => (await axiosPrivate.get<ApiResponse<User>>('user')).data,
  updateUserProfile: async (data: UpdateUserProfileSchema) =>
    (await axiosPrivate.patch<ApiResponse<User>>('user', data)).data,
  updateUserPassword: async (data: UpdateUserPasswordSchema) =>
    (await axiosPrivate.patch<ApiResponse<undefined>>('user/change-password', data)).data,
}

export default userApi
