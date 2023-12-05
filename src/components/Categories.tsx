import categoriesApi from '@/api/category.api'
import { routes } from '@/configs/routes'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useQuery } from '@tanstack/react-query'
import { NavLink } from 'react-router-dom'

export default function Categories() {
  const { data, isPending } = useQuery({
    queryKey: ['categories'],
    queryFn: categoriesApi.getAll,
  })

  return (
    <>
      <section className='my-2 px-4 lg:flex lg:px-0'>
        <div className='mr-3 inline-flex items-center gap-2'>
          <FontAwesomeIcon icon={faBars} />
          <span className='whitespace-nowrap font-semibold'>Danh mục</span>
        </div>
        <ul className='menu rounded-box menu-horizontal min-w-full flex-wrap items-center gap-2 px-0'>
          {isPending && (
            <div className='flex w-full justify-center'>
              <span className='loading loading-spinner' />
            </div>
          )}
          {data &&
            data.data.map((category) => (
              <li key={category.id}>
                <NavLink
                  to={routes.category.replace(':id', category.id)}
                  className={({ isActive }) =>
                    (isActive ? 'bg-gray-200' : 'bg-white') +
                    ' rounded-xl border p-2 text-gray-800 shadow-sm hover:bg-gray-200'
                  }
                >
                  <img className='h-8 rounded-full' src={category.image} />
                  {category.name}
                </NavLink>
              </li>
            ))}
        </ul>
        <div className='divider my-0 lg:hidden'></div>
      </section>
    </>
  )
}
