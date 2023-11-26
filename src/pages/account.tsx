import AccountMenu from '@/components/AccountMenu'
import Card from '@/components/Card'

export default function Account() {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex gap-4'>
        <div className='w-1/3'>
          <AccountMenu />
        </div>
        <div className='w-2/3'>
          <Card>
            <h2 className='text-xl font-semibold'>Quản lý tài khoản</h2>
          </Card>
        </div>
      </div>
    </div>
  )
}
