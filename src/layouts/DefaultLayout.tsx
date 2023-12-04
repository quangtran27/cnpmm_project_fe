import Categories from '@/components/Categories'
import Container from '@/components/Container'
import Header from '@/components/Header'
import { routes } from '@/configs/routes'
import { selectAuth } from '@/features/auth/authSlice'
import { useAppSelector } from '@/hooks/useAppSelector'
import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

export default function DefaultLayout() {
  const location = useLocation()
  const isAuthPage = [routes.login, routes.register, routes.forgotPassword].includes(location.pathname)
  const isAuthenticated = !!useAppSelector(selectAuth).accessToken
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated && isAuthPage) {
      navigate(routes.home)
    }
  }, [isAuthPage, isAuthenticated, navigate])

  if (isAuthPage) return <Outlet></Outlet>

  return (
    <>
      <Header />
      <main className='min-h-screen bg-gray-100 text-sm'>
        <div className='h-header'></div>
        <Container>
          <Categories />
          <Outlet />
        </Container>
      </main>
    </>
  )
}
