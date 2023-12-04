import { Option } from '@/types/filter.type'
import { Link } from 'react-router-dom'

export type BreadcrumbsProps = {
  items?: Option[]
}

export default function Breadcrumbs({ items = [] }: BreadcrumbsProps) {
  return (
    <div className='breadcrumbs flex-wrap px-4 py-0 text-sm lg:px-0'>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <Link to={item.value}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
