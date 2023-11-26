type UserRoles = 'user' | 'admin'

export interface User {
  id: string
  email: string
  password: string
  fullName: string
  role: UserRoles
  status: boolean
}
