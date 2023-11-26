import { ReactNode } from 'react'

interface CardProps {
  size?: 'sm' | 'md'
  children?: ReactNode
  className?: string
}

export default function Card({ children, size = 'md', className }: CardProps) {
  return (
    <div className={`${className} ${size === 'md' ? 'p-6' : size === 'sm' ? 'p-3' : ''} rounded-xl bg-white shadow`}>
      {children}
    </div>
  )
}
