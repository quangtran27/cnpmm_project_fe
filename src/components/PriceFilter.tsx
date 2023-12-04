import { priceOptions } from '@/utils/samples/filters.sample'
import { ChangeEventHandler } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

function convertValueToParams(value: string): {
  [key: string]: string
} {
  const result: {
    [key: string]: string
  } = {}
  const items = value.split(',')
  items.forEach((item) => {
    const [key, value] = item.split('|')
    result[key] = value
  })

  return result
}

export default function PriceFilter() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const selected: string[] = []
  for (const [key, value] of searchParams.entries()) {
    if (key === 'Price/min' || key === 'Price/max') {
      selected.push(key + '|' + value)
    }
  }

  const handleChangeOption: ChangeEventHandler<HTMLSelectElement> = (e) => {
    if (e.target.value === 'clear') {
      clear()
    } else {
      searchParams.delete('Price/max')
      searchParams.delete('Price/min')
      for (const [key, value] of Object.entries(convertValueToParams(e.target.value))) {
        searchParams.set(key, value)
      }
      navigate({
        search: searchParams.toString(),
      })
    }
  }

  const clear = () => {
    searchParams.delete('Price/max')
    searchParams.delete('Price/min')
    console.log(searchParams.toString())
    navigate({
      search: searchParams.toString(),
    })
  }

  return (
    <div className='flex items-center gap-3'>
      <span>Khoảng giá:</span>
      <select className='select select-bordered select-sm' value={selected.join(',')} onChange={handleChangeOption}>
        <option value={'clear'}>Tất cả</option>
        {priceOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
