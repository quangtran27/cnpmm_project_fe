import AccountMenu from '@/components/AccountMenu'
import Card from '@/components/Card'
import Order from '@/components/Order'

export default function Orders() {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex gap-4'>
        <div className='w-1/3'>
          <AccountMenu />
        </div>
        <div className='flex w-2/3 flex-col gap-4'>
          <Card>
            <h2 className='text-xl font-semibold'>Quản lý đơn hàng</h2>
          </Card>
          <Order />
        </div>
      </div>
    </div>
  )
}
