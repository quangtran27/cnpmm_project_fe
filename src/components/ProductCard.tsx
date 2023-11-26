import { paths } from '@/configs/paths'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

export default function ProductCard() {
  return (
    <Link to={paths.productDetail.replace(':id', '1')} className='card-compact card bg-white shadow'>
      <figure>
        <img
          src='https://images.thinkgroup.vn/unsafe/1000x1000/https://media-api-beta.thinkpro.vn/media/core/products/2022/9/30/apple-macbook-pro-16-m1-thinkpro-1.png'
          alt='Macbook'
        />
      </figure>
      <div className='card-body'>
        <h2 className='card-title'>Shoes!</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className='card-actions items-center justify-between'>
          <span className='text-lg font-semibold text-secondary'>99.999.999đ</span>
          <button className='btn btn-primary btn-outline'>
            <FontAwesomeIcon icon={faShoppingCart} />
          </button>
        </div>
      </div>
    </Link>
  )
}
