import authApi from '@/api/auth.api'
import { routes } from '@/configs/routes'
import { login } from '@/features/auth/authSlice'
import { useAppDispatch } from '@/hooks/userAppDispatch'
import { ApiResponse } from '@/types/api.type'
import { LoginSchema, loginSchema } from '@/utils/validators/auth.validator'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Login() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [showPassword, setShowPassWord] = useState(false)
  const [searchParams] = useSearchParams()

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<LoginSchema>({
    resolver: yupResolver(loginSchema),
  })

  const loginMutation = useMutation({
    mutationFn: (data: LoginSchema) => authApi.login(data),
    onSuccess: (res) => {
      dispatch(login(res.data))
      navigate(searchParams.get('next') ?? routes.home)
    },
    onError: (res: AxiosError) => {
      toast.error('Đăng nhập không thành công: ' + (res.response?.data as ApiResponse<string>).message)
    },
  })

  const handleLogin = handleSubmit((data) => {
    loginMutation.mutate(data)
  })

  return (
    <section className='h-screen bg-gray-100 bg-auth bg-cover bg-no-repeat pt-1 text-sm'>
      <div className='mx-auto mt-[18%] flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0'>
        <div className='w-full rounded-2xl border bg-white shadow-sm sm:max-w-md md:mt-0 xl:p-0'>
          <Link to='/' className='mt-6 flex items-center justify-center text-2xl font-semibold'>
            <img className='mr-2 h-10' src='/images/logo.png' alt='logo' />
          </Link>
          <div className='space-y-4 p-6 sm:p-8 md:space-y-6'>
            <h1 className='text-center text-lg font-medium leading-tight tracking-tight md:text-2xl'>
              Đăng nhập vào tài khoản của bạn
            </h1>
            <form className='space-y-4 md:space-y-6' onSubmit={handleLogin}>
              <div>
                <label htmlFor='email' className='mb-2 block'>
                  Email
                </label>
                <input
                  type='email'
                  className='input input-bordered w-full'
                  placeholder='nguyenvana@gmail.com'
                  {...register('email')}
                />
                {errors.email && <div className='mt-2 text-error'>{errors.email.message}</div>}
              </div>
              <div>
                <label htmlFor='password' className='mb-2 block'>
                  Mật khẩu
                </label>
                <div className='relative'>
                  <span
                    className='absolute inset-y-0 right-0 mr-4 flex cursor-pointer items-center'
                    onClick={() => {
                      setShowPassWord((prev) => !prev)
                    }}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='••••••••'
                    className='input input-bordered w-full'
                    {...register('password')}
                  />
                </div>
                {errors.password && <div className='mt-2 text-error'>{errors.password.message}</div>}
                <p className='mt-4 text-right font-light text-gray-500'>
                  <Link to={routes.forgotPassword} className='text-primary-600 font-medium hover:underline'>
                    Quên mật khẩu?
                  </Link>
                </p>
              </div>
              <button disabled={loginMutation.isPending} type='submit' className='btn btn-primary w-full'>
                {loginMutation.isPending ? <span className='loading loading-spinner' /> : 'Đăng nhập'}
              </button>
              <p className='text-center font-light text-gray-500'>
                Chưa có tài khoản?{' '}
                <Link to={routes.register} className='text-primary-600 font-medium hover:underline'>
                  Đăng ký ngay
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
