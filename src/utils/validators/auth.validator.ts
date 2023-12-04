import { InferType, object, string } from 'yup'

export const loginSchema = object({
  email: string().required('Vui lòng điền email').email('Email không đúng định dạng'),
  password: string().required('Vui lòng điền mật khẩu'),
})
export type LoginSchema = InferType<typeof loginSchema>

export const forgotPasswordSchema = object({
  email: string().required('Vui lòng điền email').email('Email không đúng định dạng'),
})
export type ForgotPasswordSchema = InferType<typeof forgotPasswordSchema>
