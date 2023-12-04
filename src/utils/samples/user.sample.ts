import { User, UserRoles } from '@/types/user.type'

export const emptyUser: User = {
  id: '',
  email: '',
  fullName: '',
  password: '',
  role: UserRoles.guest,
  status: false,
}
