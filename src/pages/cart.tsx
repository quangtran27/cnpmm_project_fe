import productsApi from '@/api/products.api'
import Card from '@/components/Card'
import CartItem from '@/components/CartItem'
import { routes } from '@/configs/routes'
import { selectAuth } from '@/features/auth/authSlice'
import { selectCart } from '@/features/cart/cartSlice'
import { useAppSelector } from '@/hooks/useAppSelector'
import { toVND } from '@/utils/converters/money.converter'
import { emptyReponse } from '@/utils/samples/api.sample'
import { emptyProduct } from '@/utils/samples/products.sample'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useQueries } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'

export default function Cart() {
  const cartItems = useAppSelector(selectCart).items
  const navigate = useNavigate()
  const auth = useAppSelector(selectAuth)

  const productsRes = useQueries({
    queries: cartItems.map((item) => {
      return {
        queryKey: ['product', item.productId],
        queryFn: () => productsApi.get(item.productId),
        initialData: emptyReponse(emptyProduct),
      }
    }),
  })

  const isLoading = productsRes.some((result) => result.isLoading)

  let provisional = 0
  let discount = 0

  productsRes.forEach((response, index) => {
    if (response.isSuccess) {
      const product = response.data.data
      provisional += (product.onSale ? product.salePrice : product.price) * cartItems[index].quantity
      discount += product.onSale ? (product.price - product.salePrice) * cartItems[index].quantity : 0
    }
  })

  const handleOrder = () => {
    if (auth.accessToken) {
      navigate(routes.checkout, {
        state: {
          orderItems: productsRes.map((response) => {
            return {
              productId: response.data?.data.id,
              productName: response.data?.data.name,
              productImage: response.data?.data.images ? response.data?.data.images[0] : '/images/default_product.png',
              productPrice: response.data?.data.onSale ? response.data?.data.salePrice : response.data?.data.price,
              quantity: cartItems.find((item) => item.productId === response.data?.data.id)?.quantity ?? 0,
            }
          }),
        },
      })
    } else {
      navigate({
        pathname: routes.login,
        search: '?next=' + routes.cart,
      })
    }
  }

  return (
    <div className='px-4 lg:px-0'>
      <div className='mb-4 w-full'>
        <h1 className='text-xl font-semibold'>Giỏ hàng ({cartItems.length})</h1>
      </div>
      <div className='grid grid-cols-3 gap-4'>
        <div className='col-span-3 flex flex-col gap-4 lg:col-span-2'>
          {cartItems.length === productsRes.length &&
            cartItems.map((item, index) => (
              <CartItem key={item.productId} {...item} product={productsRes[index].data?.data ?? emptyProduct} />
            ))}
          {!cartItems.length && (
            <div className='flex flex-col items-center gap-4'>
              <div>Giỏ hàng trống, hãy tiếp tục mua sắm</div>
              <Link to={routes.home} className='btn btn-primary'>
                <FontAwesomeIcon icon={faHome} /> Về trang chủ
              </Link>
            </div>
          )}
        </div>
        <div className='col-span-3 lg:col-span-1'>
          <Card size='none' className='p-3 lg:p-6'>
            <h2 className='text-lg font-semibold'>Tóm tắt đơn hàng</h2>
            <div className='my-4 overflow-x-auto'>
              <table className='table'>
                <tbody>
                  <tr>
                    <td>Tạm tính:</td>
                    <td className='text-right'>
                      <span className='text-base font-semibold'>
                        {isLoading ? <span className='loading loading-spinner' /> : toVND(provisional)}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Giảm giá:</td>
                    <td className='text-right'>
                      <span className='text-gray-600 line-through'>
                        {isLoading ? <span className='loading loading-spinner' /> : toVND(discount)}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Tổng cộng:</td>
                    <td className='text-right'>
                      <span className='text-lg font-bold text-secondary'>
                        {isLoading ? <span className='loading loading-spinner' /> : toVND(provisional - discount)}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button disabled={!cartItems.length} className='btn btn-secondary w-full' onClick={handleOrder}>
              Đặt hàng
            </button>
          </Card>
        </div>
      </div>
    </div>
  )
}
