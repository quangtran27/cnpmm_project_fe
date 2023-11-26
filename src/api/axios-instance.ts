import axios from 'axios'
import queryString from 'query-string'

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
