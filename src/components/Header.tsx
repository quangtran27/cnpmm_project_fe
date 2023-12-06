import { routes } from '@/configs/routes'
import { selectAuth } from '@/features/auth/authSlice'
import { selectCart } from '@/features/cart/cartSlice'
import { useAppSelector } from '@/hooks/useAppSelector'
import { SearchSchema, searchSchema } from '@/utils/validators/search.validotor'
import { faCartShopping, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'

export default function Header() {
  const isAuthenticated = !!useAppSelector(selectAuth).accessToken
  const cartItems = useAppSelector(selectCart).items
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm<SearchSchema>({
    resolver: yupResolver(searchSchema),
    defaultValues: {
      keyword: searchParams.get('keyword') ?? '',
    },
  })

  const handleSearch = handleSubmit((data) => {
    navigate({
      pathname: routes.search,
      search: `?keyword=${data.keyword}`,
    })
  })

  return (
    <header className='fixed inset-x-0 top-0 z-10 h-header bg-white px-4 shadow lg:px-0'>
      <div className='mx-auto flex h-full max-w-screen-xl items-center gap-6'>
        <Link to={routes.home} className='h-1/2 lg:h-2/3 lg:py-2'>
          <img src='/images/logo.png' className='h-full' alt='' />
        </Link>
        <form className='input input-bordered relative hidden w-[442px] outline-none lg:block' onSubmit={handleSearch}>
          <span className='absolute inset-y-0 left-0 flex items-center pl-4'>
            <FontAwesomeIcon icon={faMagnifyingGlass} className='text-gray-500' />
          </span>
          <input
            className='absolute inset-0 left-10 rounded-r-2xl pr-4 outline-none'
            placeholder='Tìm kiếm sản phẩm phù hợp với nhu cầu của bạn'
            type='search'
            {...register('keyword')}
          />
        </form>
        <div className='flex flex-1 justify-end gap-4'>
          <Link to={routes.cart}>
            <button className='btn indicator'>
              <FontAwesomeIcon icon={faCartShopping} />
              <span className='badge indicator-item badge-secondary text-white'>{cartItems.length}</span>
            </button>
          </Link>
          {isAuthenticated ? (
            <>
              <Link to={routes.profile}>
                <button className='btn'>
                  <FontAwesomeIcon icon={faUser} />
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link to={routes.login} className='btn btn-primary'>
                Đăng nhập
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
