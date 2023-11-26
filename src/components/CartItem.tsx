import Card from '@/components/Card'

export default function CartItem() {
  return (
    <Card size='md'>
      <div className='relative flex items-center gap-6'>
        <div className='h-20 w-20 rounded-xl bg-gray-500'></div>
        <div className='flex flex-col gap-2'>
          <h2 className='text-lg font-semibold'>Macbook Pro M1</h2>
          <div className='flex rounded-xl border'>
            <button className='btn btn-square text-lg'>-</button>
            <input type='text' className='w-12 px-2 text-center outline-none' value={0} />
            <button className='btn btn-square text-lg'>+</button>
          </div>
        </div>
        <div className='flex flex-1 items-center justify-end'>
          <span className='text-lg font-semibold text-secondary'>49.999.999 đ</span>
        </div>
        <button className='btn btn-circle btn-sm absolute right-0 top-0 -m-5'>x</button>
      </div>
    </Card>
  )
}
