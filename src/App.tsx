import Login from '@/pages/login'
import { Route, Routes } from 'react-router-dom'
import { routes } from './configs/routes'
import DefaultLayout from './layouts/DefaultLayout'
import Account from './pages/account'
import Cart from './pages/cart'
import Category from './pages/category'
import ChangePassword from './pages/change-password'
import Checkout from './pages/checkout'
import Home from './pages/home'
import Logout from './pages/logout'
import OrderDetail from './pages/order-detail'
import Orders from './pages/orders'
import ProductDetail from './pages/product-detail'
import Profile from './pages/profile'
import Register from './pages/register'
import Search from './pages/search'
import ForgotPassword from './pages/forgot-password'

function App() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.login} element={<Login />} />
        <Route path={routes.forgotPassword} element={<ForgotPassword />} />
        <Route path={routes.logout} element={<Logout />} />
        <Route path={routes.register} element={<Register />} />
        <Route path={routes.cart} element={<Cart />} />
        <Route path={routes.checkout} element={<Checkout />} />
        <Route path={routes.search} element={<Search />} />
        <Route path={routes.account} element={<Account />} />
        <Route path={routes.profile} element={<Profile />} />
        <Route path={routes.changePassword} element={<ChangePassword />} />
        <Route path={routes.orders} element={<Orders />} />
        <Route path={routes.orderDetail} element={<OrderDetail />} />
        <Route path={routes.category} element={<Category />} />
        <Route path={routes.productDetail} element={<ProductDetail />} />
      </Route>
    </Routes>
  )
}

export default App
