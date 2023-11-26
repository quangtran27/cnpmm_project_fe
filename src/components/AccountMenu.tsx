import { paths } from '@/configs/paths'
import { NavLink } from 'react-router-dom'

export default function AccountMenu() {
  return (
    <ul className='menu rounded-box w-full bg-white text-base shadow'>
      <li>
        <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to={paths.profile}>
          Thông tin cá nhân
        </NavLink>
      </li>
      <li>
        <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to={paths.changePassword}>
          Mật khẩu
        </NavLink>
      </li>
      <li>
        <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to={paths.orders}>
          Đơn hàng
        </NavLink>
      </li>
    </ul>
  )
}
