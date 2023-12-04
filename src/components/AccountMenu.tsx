import { routes } from '@/configs/routes'
import { faShopify } from '@fortawesome/free-brands-svg-icons'
import { faLock, faSignOut, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, NavLink } from 'react-router-dom'

export default function AccountMenu() {
  return (
    <ul className='menu rounded-box w-full bg-white text-base shadow'>
      <li>
        <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to={routes.profile}>
          <FontAwesomeIcon icon={faUser} />
          Thông tin cá nhân
        </NavLink>
      </li>
      <li>
        <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to={routes.changePassword}>
          <FontAwesomeIcon icon={faLock} />
          Mật khẩu
        </NavLink>
      </li>
      <li>
        <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to={routes.orders}>
          <FontAwesomeIcon icon={faShopify} />
          Đơn hàng
        </NavLink>
      </li>
      <li>
        <Link className='text-error' to={routes.logout}>
          <FontAwesomeIcon icon={faSignOut} />
          Đăng xuất
        </Link>
      </li>
    </ul>
  )
}
