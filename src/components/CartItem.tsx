import Card from '@/components/Card'
import { routes } from '@/configs/routes'
import { removeFromCart, updateQuantity } from '@/features/cart/cartSlice'
import { useAppDispatch } from '@/hooks/userAppDispatch'
import { CartItem as TCartItem } from '@/types/carts.type'
import { Product } from '@/types/products.type'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

type CartItemProps = TCartItem & {
  product: Product
}

const WAITING = 1000 // 1000ms

export default function CartItem({ product, ...props }: CartItemProps) {
  const dispatch = useAppDispatch()
  const [isWaiting, setWaiting] = useState(false)

  const isMaximum = props.quantity >= product.quantity

  const handleChangeQuantity = async (_quantity: number) => {
    setWaiting(true)

    if (_quantity > 0 && _quantity <= product.quantity) {
      dispatch(updateQuantity({ productId: props.productId, quantity: _quantity }))
    } else {
      dispatch(updateQuantity({ productId: props.productId, quantity: product.quantity }))
      toast.warn(`Giỏ hàng của bạn đã đạt giới hạn về số lượng với sản phẩm này. Tối đa ${product.quantity} sản phẩm`)
    }

    setTimeout(() => {
      setWaiting(false)
    }, WAITING)
  }

  const handleConfirmDeleteCartItem = () => {
    if (window.confirm('Bạn có thực sự muốn xoá sản phẩm này khỏi giỏ hàng?')) {
      dispatch(removeFromCart(props.productId))
    }
  }

  return (
    <Card size='sm'>
      <div className='relative flex items-start gap-4'>
        <div className='relative h-12 w-12 rounded-lg border lg:h-24 lg:w-24'>
          <img
            className='absolute inset-0'
            src={product.images.length ? product.images[0] : '/images/default_product.png'}
          />
        </div>
        <div className='flex h-full flex-1 flex-col items-center lg:flex-row'>
          <div className='flex flex-1 flex-col gap-2'>
            <Link
              to={
                product.id
                  ? routes.productDetail.replace(':categoryId', product.categoryId).replace(':id', product.id)
                  : ''
              }
              className='link-hover line-clamp-2 overflow-hidden text-ellipsis text-base font-semibold lg:line-clamp-1'
            >
              {product.name}
            </Link>
            <div className='join w-fit rounded-lg border'>
              <button
                disabled={props.quantity <= 1}
                className='btn join-item btn-sm mr-1 rounded-lg rounded-r-none border-0 border-r bg-white'
                onClick={() => {
                  !isWaiting && handleChangeQuantity(props.quantity - 1)
                }}
              >
                -
              </button>
              <input
                type='text'
                className='input input-sm w-16 border-none text-center outline-none'
                value={props.quantity}
                onChange={(e) => {
                  !isWaiting && handleChangeQuantity(Number.parseInt(e.target.value))
                }}
              />
              <button
                disabled={isMaximum}
                className='btn join-item btn-sm rounded-lg rounded-l-none border-0 border-l bg-white'
                onClick={() => {
                  !isWaiting && handleChangeQuantity(props.quantity + 1)
                }}
              >
                +
              </button>
            </div>
          </div>
          <div className='mt-3 flex flex-1 items-center justify-between gap-2 lg:mr-4 lg:mt-0 lg:flex-col lg:items-end lg:justify-center'>
            <div>
              <span className='mr-4 text-sm font-medium'>
                {(product.onSale ? product.salePrice : product.price)
                  .toLocaleString('it-IT', {
                    style: 'currency',
                    currency: 'VND',
                  })
                  .replace('VND', 'đ')}
              </span>
              <span>x {props.quantity}</span>
            </div>
            <div className='text-lg font-semibold text-secondary'>
              {((product.onSale ? product.salePrice : product.price) * props.quantity)
                .toLocaleString('it-IT', {
                  style: 'currency',
                  currency: 'VND',
                })
                .replace('VND', 'đ')}
            </div>
          </div>
        </div>
        <button
          className='btn btn-circle btn-ghost btn-xs absolute right-0 top-0 -m-2'
          onClick={handleConfirmDeleteCartItem}
        >
          <FontAwesomeIcon icon={faClose} />
        </button>
      </div>
    </Card>
  )
}
