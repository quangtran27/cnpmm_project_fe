import Categories from '@/components/Categories'
import Container from '@/components/Container'
import Header from '@/components/Header'
import { Outlet } from 'react-router-dom'

export default function AccountLayout() {
  return (
    <>
      <Header />
      <main className='min-h-screen bg-gray-100'>
        <div className='h-header'></div>
        <Container>
          <Categories />
          <Outlet />
        </Container>
        <div className='h-screen'></div>
      </main>
    </>
  )
}
