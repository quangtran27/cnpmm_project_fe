export enum UserRoles {
  user = 'USER',
  admin = 'ADMIN',
  guest = 'GUEST',
}

export type User = {
  id: string
  email: string
  fullName: string
  password: string
  role: UserRoles
  status: boolean
}

export type Token = {
  uid: string
  role: string
  nbf: number
  exp: number
  iat: number
}
