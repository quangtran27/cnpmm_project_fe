import { OrderItem as TOrderItem } from '@/types/orders.type'
import Card from './Card'

type OrderItemProps = TOrderItem

export default function OrderItem({ ...props }: OrderItemProps) {
  return (
    <Card size='sm' className='flex-1'>
      <div className='relative flex items-center gap-6'>
        <div className='h-24 w-24 rounded-xl bg-gray-500'>
          <img src={props.productImage} />
        </div>
        <div className='flex flex-col gap-2'>
          <h2 className='text-lg font-semibold'>Macbook Pro M1</h2>
        </div>
        <div className='flex flex-1 items-center justify-end'>
          <span className='text-lg font-semibold text-secondary'>49.999.999 đ</span>
        </div>
        <span>x1</span>
      </div>
    </Card>
  )
}
