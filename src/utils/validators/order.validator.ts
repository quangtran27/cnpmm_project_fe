import { InferType, mixed, object, string } from 'yup'

export const createOrderSchema = object({
  receiverName: string().required('Vui lòng điền họ và tên'),
  receiverPhone: string()
    .required('Vui lòng điền số điện thoại')
    .matches(/^(?:\+84|0[3-9])\d{8,9}$/, 'Số điện thoại không đúng định dạng'),
  address: string().required('Vui lòng địa chỉ'),
  payment: mixed().oneOf(['COD', 'banking']).required('Vui lòng chọn phương thức thanh toán'),
})
export type CreateOrderSchema = InferType<typeof createOrderSchema>
