import { paths } from '@/configs/paths'
import { faCartShopping, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className='fixed inset-x-0 top-0 z-10 h-header bg-white shadow'>
      <div className='mx-auto flex h-full max-w-screen-xl items-center gap-6'>
        <Link to={paths.home} className='h-full py-2'>
          <img src='/images/logo.png' className='h-full' alt='' />
        </Link>
        <form>
          <div className='relative w-80'>
            <input type='text' className='input input-bordered h-10 w-full pl-12' />
            <span className='absolute inset-y-0 left-0 flex items-center pl-4'>
              <FontAwesomeIcon icon={faMagnifyingGlass} className='text-gray-500' />
            </span>
          </div>
        </form>
        <ul className='menu rounded-box menu-vertical text-base font-semibold lg:menu-horizontal'>
          <li>
            <Link to={paths.home}>Trang chủ</Link>
          </li>
          <li>
            <Link to={paths.products}>Sản phẩm</Link>
          </li>
          <li>
            <Link to={paths.home}>Về chúng tôi</Link>
          </li>
        </ul>
        <div className='flex flex-1 justify-end gap-2'>
          <Link to={paths.cart}>
            <button className='btn'>
              <FontAwesomeIcon icon={faCartShopping} />
            </button>
          </Link>
          <Link to={paths.profile}>
            <button className='btn'>
              <FontAwesomeIcon icon={faUser} />
            </button>
          </Link>
        </div>
      </div>
    </header>
  )
}
