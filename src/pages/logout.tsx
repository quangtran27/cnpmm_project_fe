import { routes } from '@/configs/routes'
import { logout } from '@/features/auth/authSlice'
import { useAppDispatch } from '@/hooks/userAppDispatch'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Logout() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(logout())
    navigate(routes.login)
  }, [dispatch, navigate])

  return <></>
}
