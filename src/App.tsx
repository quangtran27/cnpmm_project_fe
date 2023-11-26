import Login from '@/pages/login'
import { Route, Routes } from 'react-router-dom'
import { paths } from './configs/paths'
import DefaultLayout from './layouts/DefaultLayout'
import Account from './pages/account'
import Cart from './pages/cart'
import ChangePassword from './pages/change-password'
import Home from './pages/home'
import Orders from './pages/orders'
import ProductDetail from './pages/product-detail'
import Products from './pages/products'
import Profile from './pages/profile'
import Register from './pages/register'
import Search from './pages/search'

function App() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path={paths.home} element={<Home />} />
        <Route path={paths.login} element={<Login />} />
        <Route path={paths.register} element={<Register />} />
        <Route path={paths.products} element={<Products />} />
        <Route path={paths.productDetail} element={<ProductDetail />} />
        <Route path={paths.cart} element={<Cart />} />
        <Route path={paths.search} element={<Search />} />
        <Route path={paths.account} element={<Account />} />
        <Route path={paths.profile} element={<Profile />} />
        <Route path={paths.changePassword} element={<ChangePassword />} />
        <Route path={paths.orders} element={<Orders />} />
      </Route>
    </Routes>
  )
}

export default App
