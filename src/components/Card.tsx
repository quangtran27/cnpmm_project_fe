import { ReactNode } from 'react'

interface CardProps {
  size?: 'sm' | 'md' | 'none'
  children?: ReactNode
  className?: string
}

export default function Card({ children, size = 'md', className }: CardProps) {
  const classNames = `${
    size === 'md' ? 'p-6' : size === 'sm' ? 'p-3' : ''
  } ${className} rounded-2xl border bg-white shadow-sm`

  return <div className={classNames}>{children}</div>
}
