import { addToCart, selectCart } from '@/features/cart/cartSlice'
import { useAppSelector } from '@/hooks/useAppSelector'
import { useAppDispatch } from '@/hooks/userAppDispatch'
import { useState } from 'react'
import { toast } from 'react-toastify'

type ProductCartProps = {
  producId: string
  quantity: number
}

const WAITING = 1000

export default function ProductCart({ ...props }: ProductCartProps) {
  const existedItem = useAppSelector(selectCart).items.find((item) => item.productId === props.producId)
  const [isWaiting, setWaiting] = useState(false)
  const [quantity, setQuantity] = useState(props.quantity === 0 ? 0 : 1)
  const dispach = useAppDispatch()

  const isMaximum = quantity + (existedItem?.quantity || 0) > props.quantity

  const handleChangeQuantity = async (quantity: number) => {
    setWaiting(true)

    const minimum = 0
    const maximum = props.quantity - (existedItem?.quantity || 0)

    if (quantity > minimum && quantity <= maximum) {
      setQuantity(quantity)
    } else {
      toast.warn(`Giỏ hàng của bạn đã đạt giới hạn về số lượng với sản phẩm này. Tối đa ${props.quantity} sản phẩm`)
    }

    setTimeout(() => {
      setWaiting(false)
    }, WAITING)
  }

  const handleAddToCart = () => {
    setWaiting(true)

    dispach(addToCart({ productId: props.producId, quantity: quantity }))
    toast.success('Thêm vào giỏ hàng thành công')

    setTimeout(() => {
      setWaiting(false)
    }, WAITING)
  }

  return (
    <div className='flex flex-col gap-6 lg:flex-row'>
      <div className='flex items-center justify-center gap-4'>
        <div>Số lượng:</div>
        <div className='join rounded-lg border'>
          <button
            disabled={quantity <= 1}
            className='btn join-item mr-1 rounded-lg rounded-r-none border-0 border-r bg-white text-2xl'
            onClick={() => {
              !isWaiting && handleChangeQuantity(quantity - 1)
            }}
          >
            -
          </button>
          <input
            type='text'
            className='input w-16 border-none text-center outline-none'
            value={quantity}
            onChange={(e) => {
              !isWaiting && handleChangeQuantity(Number.parseInt(e.target.value))
            }}
          />
          <button
            disabled={isMaximum}
            className='btn join-item rounded-lg rounded-l-none border-0 border-l bg-white text-2xl'
            onClick={() => {
              !isWaiting && handleChangeQuantity(quantity + 1)
            }}
          >
            +
          </button>
        </div>
      </div>
      <button
        disabled={isMaximum}
        className='btn btn-primary flex-1'
        onClick={() => {
          !isWaiting && handleAddToCart()
        }}
      >
        {props.quantity === 0 ? 'Hết hàng' : isMaximum ? 'Đã đạt số lượng tối đa' : 'Thêm vào giỏ hàng'}
      </button>
    </div>
  )
}
