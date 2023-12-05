import { usePagination } from '@/hooks/usePagination'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate, useSearchParams } from 'react-router-dom'

type PaginationProps = {
  currentPage: number
  totalPages: number
  defaultPage?: number
}

export default function Pagination({ ...props }: PaginationProps) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const paginationRange = usePagination(props)

  const handleChangePage = (page: number) => {
    searchParams.set('currentPage', page.toString())
    navigate({ search: searchParams.toString() })
  }

  console.log(props.totalPages)

  if (props.currentPage === -1 || props.totalPages < 2 || paginationRange.length === 0) {
    return <></>
  }

  const onNext = () => {
    handleChangePage(props.currentPage + 1)
  }

  const onPrevious = () => {
    handleChangePage(props.currentPage - 1)
  }

  return (
    <ul className='flex items-center gap-2 rounded-full'>
      <li className={`${props.currentPage === 0 && 'btn-disabled'} btn btn-circle btn-sm`} onClick={onPrevious}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </li>
      {paginationRange.map((page) => {
        if (page === -1) return <li key={page}>...</li>

        return (
          <li
            key={page}
            className={`${page === props.currentPage && 'btn-active'} btn btn-circle btn-sm`}
            onClick={() => {
              handleChangePage(page)
            }}
          >
            {page + 1}
          </li>
        )
      })}
      <li
        className={`${props.currentPage === props.totalPages - 1 && 'btn-disabled'} btn btn-circle btn-sm`}
        onClick={onNext}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </li>
    </ul>
  )
}
