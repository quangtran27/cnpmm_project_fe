import { RootState } from '@/store'
import { LoginData } from '@/types/auth.type'
import { User } from '@/types/user.type'
import { emptyLoginData } from '@/utils/samples/auth.sample'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const syncLocalStorage = (accessToken: string, user: User) => {
  localStorage.setItem('token', accessToken)
  localStorage.setItem('user', JSON.stringify(user))
}

const getLocalStorageAuthData = (): LoginData => {
  return {
    accessToken: localStorage.getItem('token') || emptyLoginData.accessToken,
    user: JSON.parse(localStorage.getItem('user') || JSON.stringify(emptyLoginData)) as User,
  }
}

export type AuthState = LoginData

const initialState: AuthState = getLocalStorageAuthData()

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthState>) => {
      const { accessToken, user } = action.payload
      state.accessToken = accessToken
      state.user = user
      syncLocalStorage(accessToken, user)
    },
    logout: (state) => {
      state.accessToken = emptyLoginData.accessToken
      state.user = emptyLoginData.user
      syncLocalStorage(emptyLoginData.accessToken, emptyLoginData.user)
    },
  },
})

// Selectors
export const selectAuth = (state: RootState) => state.auth

export const { login, logout } = authSlice.actions
export default authSlice.reducer
