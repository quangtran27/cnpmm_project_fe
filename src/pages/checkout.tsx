import orderApi from '@/api/order.api'
import Card from '@/components/Card'
import { routes } from '@/configs/routes'
import { clearCart } from '@/features/cart/cartSlice'
import { useAppDispatch } from '@/hooks/userAppDispatch'
import { ApiResponse } from '@/types/api.type'
import { Option } from '@/types/filter.type'
import { OrderItem } from '@/types/orders.type'
import { toVND } from '@/utils/converters/money.converter'
import { CreateOrderSchema, createOrderSchema } from '@/utils/validators/order.validator'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const paymentOptions: Option[] = [
  {
    label: 'Ship - COD (Thanh toán khi nhận hàng)',
    value: 'COD',
  },
  {
    label: 'Banking (Chuyển khoản ngân hàng - Nhân viên sẽ liên hệ sau khi đặt hàng để hỗ trợ)',
    value: 'banking',
  },
]

export default function Checkout() {
  const location = useLocation()
  const { orderItems } = location.state
  const typedOrderItems = orderItems as OrderItem[]
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  let provisional = 0
  typedOrderItems.forEach((item) => {
    provisional += item.productPrice * item.quantity
  })

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = useForm<CreateOrderSchema>({
    resolver: yupResolver(createOrderSchema),
  })

  const createOrderMutation = useMutation({
    mutationFn: (data: CreateOrderSchema & { orderItemList: { productId: string; quantity: number }[] }) =>
      orderApi.createOrder(data),
    onSuccess: () => {
      toast.success('Đặt hàng thành công!')
      dispatch(clearCart())
      navigate(routes.orders)
    },
    onError: (err: AxiosError) => {
      toast.error((err.response?.data as ApiResponse<string>).message)
    },
  })

  const handleOrder = handleSubmit((data) => {
    const orderItemList = typedOrderItems.map((item) => {
      return {
        productId: item.productId,
        quantity: item.quantity,
      }
    })

    createOrderMutation.mutate({ ...data, orderItemList: orderItemList })
  })

  useEffect(() => {
    setValue('payment', 'COD')
  }, [setValue])

  return (
    <div>
      <div className='mb-4 w-full'>
        <h1 className='text-xl font-semibold'>Đặt hàng</h1>
      </div>
      <div className='flex gap-4'>
        <div className='flex w-2/3 flex-col gap-4'>
          <Card>
            <form className='space-y-4'>
              <h2 className='text-lg font-semibold'>Thông tin nhận hàng</h2>
              <div>
                <label className='mb-2 block font-medium text-gray-900'>Họ và tên</label>
                <input
                  className='input input-bordered w-full'
                  placeholder='Nguyễn Văn A'
                  {...register('receiverName')}
                />
                {errors.receiverName && <div className='mt-2 text-error'>{errors.receiverName.message}</div>}
              </div>
              <div>
                <label className='mb-2 block font-medium text-gray-900'>Số điện thoại</label>
                <input
                  className='input input-bordered w-full'
                  placeholder='0312345678'
                  {...register('receiverPhone')}
                />
                {errors.receiverPhone && <div className='mt-2 text-error'>{errors.receiverPhone.message}</div>}
              </div>
              <div>
                <label className='mb-2 block font-medium text-gray-900'>Địa chỉ</label>
                <input
                  className='input input-bordered w-full'
                  placeholder='Số 1, Võ Văn Ngân, Thủ Đức, TP. Hồ Chí Minh'
                  {...register('address')}
                />
                {errors.address && <div className='mt-2 text-error'>{errors.address.message}</div>}
              </div>
              <div className='divider'></div>
              <h2 className='text-lg font-semibold'>Phương thức thanh toán</h2>
              <div>
                <Controller
                  name='payment'
                  control={control}
                  render={({ field }) => (
                    <div className='space-y-2 pl-2 text-base'>
                      {paymentOptions.map((option) => (
                        <div key={option.value} className='mr-4 mt-3 flex items-center'>
                          <input
                            id={`role-${option.value}`}
                            type='radio'
                            className='h-4 w-4 border-gray-300 bg-gray-100 text-blue-600'
                            {...field}
                            checked={option.value === field.value}
                            value={option.value}
                          />
                          <label htmlFor={`role-${option.value}`} className='ml-2'>
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                />
              </div>
            </form>
          </Card>
        </div>
        <div className='flex w-1/3 flex-col gap-4'>
          <Card>
            <h2 className='text-lg font-semibold'>Tóm tắt đơn hàng</h2>
            <div className='my-4 overflow-x-auto'>
              <table className='table'>
                <tbody>
                  <tr>
                    <td>Tạm tính:</td>
                    <td className='text-right'>
                      <span className='text-base font-semibold'>{toVND(provisional)}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Vận chuyển:</td>
                    <td className='text-right'>
                      <span className='text-gray-600 line-through'>{toVND(0)}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Tổng cộng:</td>
                    <td className='text-right'>
                      <span className='text-lg font-bold text-secondary'>{toVND(provisional)}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button
              className='btn btn-secondary w-full'
              onClick={() => {
                handleOrder()
              }}
            >
              Đặt hàng
            </button>
          </Card>
          <Card>
            <h2 className='text-lg font-semibold'>Sản phẩm trong đơn ({typedOrderItems.length})</h2>
            <div className='space-y-[1px] bg-gray-200 text-sm'>
              {typedOrderItems.map((item) => (
                <div key={item.productId} className='flex items-center gap-3 bg-white py-2'>
                  <div className='relative h-14 w-14 rounded-lg border'>
                    <img src={item.productImage} className='absolute inset-0' />
                  </div>
                  <div className='flex-1'>
                    <div className='line-clamp-1 overflow-hidden text-ellipsis'>{item.productName}</div>
                    <div className='flex items-center gap-2'>
                      <span className='text-base font-semibold text-secondary'>{item.productPrice}</span>
                      <span>
                        <FontAwesomeIcon icon={faClose} />
                      </span>
                      <span className='font-bold'>{item.quantity}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
