import authApi from '@/api/auth.api'
import { routes } from '@/configs/routes'
import { ApiResponse } from '@/types/api.type'
import { ForgotPasswordSchema, forgotPasswordSchema } from '@/utils/validators/auth.validator'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function ForgotPassword() {
  const navigate = useNavigate()
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<ForgotPasswordSchema>({
    resolver: yupResolver(forgotPasswordSchema),
  })

  const resetPasswordMutation = useMutation({
    mutationFn: (data: ForgotPasswordSchema) => authApi.forgotPassword(data),
    onSuccess: (response) => {
      toast.success(response.message)
      navigate(routes.login)
    },
    onError: (err: AxiosError) => {
      toast.error((err.response?.data as ApiResponse<string>).message)
    },
  })

  const handleResetPassword = handleSubmit((data) => {
    resetPasswordMutation.mutate(data)
  })

  return (
    <section className='min-h-screen bg-gray-100 bg-auth bg-cover bg-no-repeat pt-1'>
      <div className='mx-auto flex h-screen flex-col items-center justify-center px-6 py-8 lg:py-0'>
        <div className='w-full rounded-2xl border bg-white shadow-sm sm:max-w-md md:mt-0 xl:p-0'>
          <Link to='/' className='mt-6 flex items-center justify-center text-2xl font-semibold'>
            <img className='mr-2 h-10' src='/images/logo.png' alt='logo' />
          </Link>
          <div className='space-y-4 p-6 sm:p-8 md:space-y-6'>
            <h1 className='text-center text-lg font-semibold leading-tight tracking-tight md:text-2xl'>
              Đặt lại mật khẩu của bạn
            </h1>
            <form className='space-y-4 md:space-y-6' onSubmit={handleResetPassword}>
              <div>
                <label htmlFor='email' className='mb-2 block font-medium'>
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
              <button disabled={resetPasswordMutation.isPending} type='submit' className='btn btn-primary w-full'>
                {resetPasswordMutation.isPending ? <span className='loading loading-spinner' /> : 'Đặt lại'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
