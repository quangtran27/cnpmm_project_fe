import { routes } from '@/configs/routes'
import { Order as IOrder } from '@/types/orders.type'
import { toVND } from '@/utils/converters/money.converter'
import { getOrderStatusClass } from '@/utils/converters/order-status.converter'
import { faAnglesRight, faClose, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import Card from './Card'

type OrderProps = IOrder & {
  handleDelete: (id: string) => void
}

export default function Order({ ...props }: OrderProps) {
  return (
    <Card size='none' className='p-3 lg:p-6'>
      <div className='flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between'>
        <div className='space-y-2'>
          <div>
            Đơn hàng <span className='font-semibold text-primary'>#{props.id}</span>
          </div>
          <div className='text-gray-500'>Tạo ngày: 30/09/2023</div>
        </div>
        <div>
          Trạng thái: <span className={`font-semibold ${getOrderStatusClass(props.status)}`}> {props.status}</span>
        </div>
      </div>
      <div className='divider' />
      <div className='space-y-4'>
        {props.orderItemList.map((item) => (
          <div key={item.id} className='flex items-center gap-4'>
            <div className='relative h-20 w-20 rounded-lg border'>
              <img className='absolute inset-0' src={item.productImage} />
            </div>
            <div className='flex-1 font-semibold'>{item.productName}</div>
            <div className='text-gray-600'>
              <FontAwesomeIcon icon={faClose} /> <span className='font-semibold'>{item.quantity}</span>
            </div>
          </div>
        ))}
      </div>
      <div className='divider' />
      <div className='flex justify-between'>
        <span>Tổng cộng:</span>
        <span className='text-lg font-semibold text-primary'>{toVND(props.total)}</span>
      </div>
      <div className='divider' />
      <div className='grid grid-cols-2 gap-3 lg:flex lg:justify-end'>
        {props.status === 'Đã tạo' && (
          <Link
            to={routes.orderDetail.replace(':id', props.id)}
            className='btn btn-error min-w-[150px]'
            onClick={(e) => {
              e.preventDefault()
              props.handleDelete(props.id)
            }}
          >
            Huỷ đơn <FontAwesomeIcon icon={faXmark} />
          </Link>
        )}
        <Link to={routes.orderDetail.replace(':id', props.id)} className='btn btn-info min-w-[150px]'>
          Chi tiết <FontAwesomeIcon icon={faAnglesRight} />
        </Link>
      </div>
    </Card>
  )
}
