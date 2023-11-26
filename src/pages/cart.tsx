import Card from '@/components/Card'
import CartItem from '@/components/CartItem'

export default function Cart() {
  return (
    <>
      <div className='mb-4 w-full'>
        <h1 className='text-xl font-bold'>Giỏ hàng</h1>
      </div>
      <div className='flex gap-6'>
        <div className='flex w-3/5 flex-col gap-6'>
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
        </div>
        <div className='w-2/5'>
          <Card>
            <h2 className='text-lg font-semibold'>Tóm tắt đơn hàng</h2>
            <div className='my-4 overflow-x-auto'>
              <table className='table'>
                <tbody>
                  <tr>
                    <td>Tổng cộng:</td>
                    <td className='text-right'>
                      <span className='text-base font-semibold'>59.999.000 đ</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Giảm giá:</td>
                    <td className='text-right'>
                      <span className='text-gray-600 line-through'>-10.000.000 đ</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Tổng cộng:</td>
                    <td className='text-right'>
                      <span className='text-base font-semibold text-secondary'>59.999.000 đ</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button className='btn btn-secondary w-full'>Đặt hàng</button>
          </Card>
        </div>
      </div>
    </>
  )
}
