import { LoginData } from '@/types/auth.type'
import { emptyUser } from './user.sample'

export const emptyLoginData: LoginData = {
  accessToken: '',
  user: emptyUser,
}
