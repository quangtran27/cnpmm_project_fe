import { Option } from '@/types/filter.type'
import { ChangeEventHandler } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

type FilterProps = {
  title: string
  name: string
  options: Option[]
  clearLabel?: string
}

export default function Filter({ ...props }: FilterProps) {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const selectedItem = searchParams.get(props.name) ?? 'clear'

  const handleChangeOption: ChangeEventHandler<HTMLSelectElement> = (e) => {
    if (e.target.value === 'clear') {
      searchParams.delete(props.name)
      navigate({
        search: searchParams.toString(),
      })
    } else {
      searchParams.set(props.name, e.target.value)
      navigate({
        search: searchParams.toString(),
      })
    }
  }

  return (
    <div className='flex items-center gap-3'>
      <span>{props.title}:</span>
      <select className='select select-bordered select-sm' value={selectedItem} onChange={handleChangeOption}>
        <option value='clear'>{props.clearLabel ?? 'Tất cả'}</option>
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
