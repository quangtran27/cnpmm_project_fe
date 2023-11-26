import { ReactNode } from 'react'

export default function Container({ children }: { children?: ReactNode }) {
  return <div className='mx-auto max-w-screen-xl'>{children}</div>
}
