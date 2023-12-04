import { jwtDecode } from 'jwt-decode'
import { routes } from '@/configs/routes'
import { store } from '@/store'
import axios from 'axios'
import queryString from 'query-string'
import { Token } from '@/types/user.type'
import { logout } from '@/features/auth/authSlice'

export default axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params: object) => queryString.stringify(params),
})

export const axiosPrivate = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || '',
  headers: { 'Content-Type': 'application/json' },
  paramsSerializer: (params: object) => queryString.stringify(params),
})

axiosPrivate.interceptors.request.use(async (config) => {
  const token = store.getState().auth.accessToken

  let isValidToken = true

  try {
    const decodedToken: Token = jwtDecode(token)
    if (decodedToken.exp < Math.floor(Date.now() / 1000)) isValidToken = false
  } catch {
    isValidToken = false
  }

  if (isValidToken) {
    config.headers['Authorization'] = `Bearer ${token}`
  } else {
    store.dispatch(logout())
    window.location.replace(routes.login)
  }

  return config
})
