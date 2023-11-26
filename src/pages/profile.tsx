import AccountMenu from '@/components/AccountMenu'
import Card from '@/components/Card'

export default function Profile() {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex gap-4'>
        <div className='w-1/3'>
          <AccountMenu />
        </div>
        <div className='w-2/3'>
          <Card>
            <h2 className='text-xl font-semibold'>Cập nhật thông tin cá nhân</h2>
            <div className='my-4 flex flex-col gap-4'>
              <div className='grid grid-cols-3 items-center'>
                <span>Họ và tên:</span>
                <input type='text' className='input input-bordered col-span-2' />
              </div>
              <div className='grid grid-cols-3 items-center'>
                <span>Số điện thoại:</span>
                <input type='text' className='input input-bordered col-span-2' />
              </div>
            </div>
            <div className='flex justify-end'>
              <button className='btn btn-primary'>Lưu lại</button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
