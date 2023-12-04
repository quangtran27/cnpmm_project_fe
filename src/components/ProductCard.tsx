import { routes } from '@/configs/routes'
import { Product } from '@/types/products.type'
import { Link } from 'react-router-dom'
import Card from './Card'

type ProductCardProps = Product

export default function ProductCard({ ...props }: ProductCardProps) {
  return (
    <Card size='sm'>
      <Link
        to={routes.productDetail.replace(':categoryId', props.categoryId).replace(':id', props.id)}
        className='flex h-full flex-col'
      >
        <figure className='relative aspect-square w-full'>
          <img
            className='absolute h-full object-contain'
            src={props.images.length ? props.images[0] : '/images/default_product.png'}
            alt={props.name}
          />
        </figure>
        <div className='flex flex-1 flex-col gap-3'>
          <h2 className='line-clamp-2 overflow-hidden text-ellipsis text-base font-semibold'>{props.name}</h2>
          <p className='line-clamp-2 overflow-hidden text-ellipsis'>{props.description}</p>
          <div className='flex flex-1 items-end justify-between'>
            <span>Đã bán: {props.sold}</span>
            <span className='text-lg font-semibold text-secondary'>
              {(props.onSale ? props.salePrice : props.price)
                .toLocaleString('it-IT', {
                  style: 'currency',
                  currency: 'VND',
                })
                .replace('VND', 'đ')}
            </span>
          </div>
        </div>
      </Link>
    </Card>
  )
}
