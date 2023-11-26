import Card from './Card'
import OrderItem from './OrderItem'

export default function Order() {
  return (
    <Card>
      <div className='flex justify-between'>
        <span>#19084902348</span>
        <span>30/09/2023</span>
      </div>
      <div className='divider' />
      <div className='bg-gray-100 p-2'>
        <div className='flex flex-col gap-4'>
          <OrderItem />
          <OrderItem />
          <OrderItem />
          <OrderItem />
        </div>
      </div>
      <div className='divider' />
      <div className='flex justify-between'>
        <span>Tổng cộng:</span>
        <span className='text-lg font-semibold text-primary'>99.999.000đ</span>
      </div>
      <div className='divider' />
      <div className='flex justify-end'>
        <button className='btn btn-error min-w-[150px]'>Huỷ</button>
      </div>
    </Card>
  )
}
