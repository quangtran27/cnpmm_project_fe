import Card from './Card'

export default function OrderItem() {
  return (
    <Card size='sm' className='flex-1'>
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
        <span>x1</span>
      </div>
    </Card>
  )
}
