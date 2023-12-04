import { InferType, object, string } from 'yup'

export const registerSchema = object({
  fullName: string().required('Vui lòng điền họ và tên'),
  email: string().required('Vui lòng điền email').email('Email không đúng định dạng'),
  password: string()
    .required('Vui lòng điền mật khẩu')
    .min(8, 'Mật khẩu quá ngắn - nên đặt mật khẩu từ 8 ký tự trở lên'),
})
export type RegisterSchema = InferType<typeof registerSchema>

export const updateUserProfileSchema = object({
  fullName: string().required('Vui lòng điền họ tên'),
  email: string().required('Vui lòng điền email').email('Email không đúng định dạng'),
})
export type UpdateUserProfileSchema = InferType<typeof updateUserProfileSchema>

export const updateUserPasswordSchema = object({
  password: string().required('Vui lòng nhập mật khẩu'),
  newPassword: string()
    .required('Vui lòng nhập mật khẩu mới')
    .min(8, 'Mật khẩu quá ngắn - nên đặt mật khẩu từ 8 ký tự trở lên'),
})
export type UpdateUserPasswordSchema = InferType<typeof updateUserPasswordSchema>
