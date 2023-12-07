import orderApi from '@/api/order.api'
import AccountMenu from '@/components/AccountMenu'
import Card from '@/components/Card'
import { routes } from '@/configs/routes'
import { OrderPayment } from '@/types/orders.type'
import { toVND } from '@/utils/converters/money.converter'
import { getOrderStatusClass } from '@/utils/converters/order-status.converter'
import { emptyReponse } from '@/utils/samples/api.sample'
import { emptyOrderDetail } from '@/utils/samples/orders.sample'
import { faChevronLeft, faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from './loading'

export default function OrderDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  const {
    data: { data: order },
    isLoading,
  } = useQuery({
    queryKey: ['order', id],
    queryFn: () => orderApi.get(id || ''),
    initialData: emptyReponse(emptyOrderDetail),
  })

  const statusClass = getOrderStatusClass(order.status)

  return isLoading ? (
    <Loading />
  ) : (
    <div className='flex min-h-screen flex-col gap-4 px-4 lg:px-0'>
      <div className='grid grid-cols-3 gap-4'>
        <div className='col-span-3 lg:col-span-1'>
          <AccountMenu />
        </div>
        <div className='col-span-3 flex flex-col gap-4 pb-4 lg:col-span-2'>
          <Card size='none' className='p-3 lg:p-6'>
            <div className='flex items-center'>
              <div className='flex flex-1 items-center gap-3'>
                <button
                  className='btn'
                  onClick={() => {
                    navigate(routes.orders)
                  }}
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <div>
                  Chi tiết đơn hàng <span className='font-semibold'>#{id}</span>
                </div>
              </div>
              <span>
                Trạng thái: <span className={`font-semibold ${statusClass}`}>{order.status}</span>
              </span>
            </div>
            <div className='divider' />
            <div className='space-y-2'>
              <div>
                Ngày tạo đơn: <span className='text-primary'>{order.createdAt}</span>
              </div>
              <div>Lần cuối cập nhật: {order.lastUpdatedAt}</div>
              <div>
                Phương thức thanh toán:{' '}
                <span className='font-semibold'>
                  {order.payment === OrderPayment.cod ? 'COD (Thanh toán khi nhận hàng)' : 'Chuyển khoản ngân hàng'}
                </span>
              </div>
              {order.payment === OrderPayment.banking && (
                <div className='flex items-center gap-3'>
                  {order.isPaid ? (
                    <span className='font-semibold text-success'>Đã thanh toán</span>
                  ) : (
                    <span className='font-semibold text-error'>Chưa thanh toán</span>
                  )}
                </div>
              )}
            </div>
            <div className='divider' />
            <div className='rounded-lg border bg-gray-100 p-4'>
              <h2 className='text-base font-semibold'>Thông tin nhận hàng:</h2>
              <div className='overflow-x-auto'>
                <table className='table'>
                  <tbody>
                    <tr>
                      <td>Họ và tên:</td>
                      <td className='font-semibold'>{order.receiverName}</td>
                    </tr>
                    <tr>
                      <td>Số điện thoại:</td>
                      <td className='font-semibold'>{order.receiverPhone}</td>
                    </tr>
                    <tr>
                      <td>Địa chỉ</td>
                      <td className='font-semibold'>{order.address}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className='divider'></div>
            <div>
              <h2 className='text-lg font-semibold'>Sản phẩm trong đơn ({order.orderItemList.length})</h2>
              <div className='text-sm'>
                {order.orderItemList.map((item) => (
                  <div key={item.productId} className='flex items-center gap-3 bg-white py-2'>
                    <div className='relative h-20 w-20 rounded-lg border'>
                      <img src={item.productImage} className='absolute inset-0' />
                    </div>
                    <div className='line-clamp-1 flex-1 overflow-hidden text-ellipsis font-semibold'>
                      {item.productName}
                    </div>
                    <div className='flex items-center gap-2'>
                      <span className='text-base font-semibold text-primary'>{item.productPrice}</span>
                      <span>
                        <FontAwesomeIcon icon={faClose} />
                      </span>
                      <span className='font-bold'>{item.quantity}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className='divider'></div>
            <div className='space-x-2 text-right'>
              <span>Thành tiền:</span> <span className='text-lg font-bold text-secondary'>{toVND(order.total)}</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
