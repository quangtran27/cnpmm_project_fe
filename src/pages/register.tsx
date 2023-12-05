import userApi from '@/api/user.api'
import { routes } from '@/configs/routes'
import { RegisterSchema, registerSchema } from '@/utils/validators/user.validator'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Register() {
  const navigate = useNavigate()
  const [showPassword, setShowPassWord] = useState(false)

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<RegisterSchema>({
    resolver: yupResolver(registerSchema),
  })

  const registerMutation = useMutation({
    mutationFn: (data: RegisterSchema) => userApi.createUser(data),
    onSuccess: () => {
      toast.success('Đăng ký thành công')
      navigate(routes.login)
    },
    onError: () => {
      toast.error('Đăng ký không thành công! Đã xảy ra lỗi')
    },
  })

  const handleRegister = handleSubmit((data) => {
    registerMutation.mutate(data)
  })

  return (
    <section className='h-screen bg-gray-100 bg-auth bg-cover bg-no-repeat py-1 text-sm'>
      <div className='mx-auto flex h-screen flex-col items-center justify-center px-6 py-8 lg:py-0'>
        <div className='w-full rounded-2xl border bg-white shadow-sm sm:max-w-md md:mt-0 xl:p-0'>
          <Link to={routes.home} className='mt-6 flex items-center justify-center text-2xl font-semibold'>
            <img className='mr-2 h-10' src='/images/logo.png' alt='logo' />
          </Link>
          <div className='space-y-4 p-6 sm:p-8 md:space-y-6'>
            <h1 className='text-lg font-medium md:text-2xl'>Tạo tài khoản mới</h1>
            <form className='space-y-4 md:space-y-6' onSubmit={handleRegister}>
              <div>
                <label htmlFor='email' className='mb-2 block'>
                  Họ và tên
                </label>
                <input className='input input-bordered w-full' placeholder='Nguyễn Văn A' {...register('fullName')} />
                {errors.fullName && <div className='mt-2 text-error'>{errors.fullName.message}</div>}
              </div>
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
              </div>
              <button type='submit' className='btn btn-primary w-full' disabled={registerMutation.isPending}>
                {registerMutation.isPending ? <span className='loading loading-spinner' /> : 'Tạo tài khoản mới'}
              </button>
              <p className='text-center font-light text-gray-500'>
                Đã có tài khoản?{' '}
                <Link to={routes.login} className='text-primary-600 font-medium hover:underline'>
                  Đăng nhập ngay
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
