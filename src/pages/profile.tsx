import userApi from '@/api/user.api'
import AccountMenu from '@/components/AccountMenu'
import Card from '@/components/Card'
import { routes } from '@/configs/routes'
import { login, selectAuth } from '@/features/auth/authSlice'
import { useAppSelector } from '@/hooks/useAppSelector'
import { useAppDispatch } from '@/hooks/userAppDispatch'
import { ApiResponse } from '@/types/api.type'
import { UpdateUserProfileSchema, updateUserProfileSchema } from '@/utils/validators/user.validator'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Profile() {
  const auth = useAppSelector(selectAuth)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!auth.user.id) navigate(routes.login)
  }, [navigate, auth.user.id])

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<UpdateUserProfileSchema>({
    mode: 'onSubmit',
    resolver: yupResolver(updateUserProfileSchema),
    defaultValues: {
      fullName: auth.user.fullName,
      email: auth.user.email,
    },
  })

  const updateUserProfileMutation = useMutation({
    mutationFn: (data: UpdateUserProfileSchema) => userApi.updateUserProfile(data),
    onSuccess: (res) => {
      toast.success('Cập nhật thành công!')
      dispatch(login({ accessToken: auth.accessToken, user: res.data }))
    },
    onError: (res: AxiosError) => {
      toast.error('Đã xảy ra lỗi: ' + (res.response?.data as ApiResponse<undefined>).message)
    },
  })

  const handleUpdateProfile = handleSubmit((data) => {
    updateUserProfileMutation.mutate(data)
  })

  return (
    <div className='flex flex-col gap-4 px-4 lg:p-0'>
      <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
        <div>
          <AccountMenu />
        </div>
        <div className='lg:col-span-2'>
          <Card size='none' className='p-3 lg:p-6'>
            <h2 className='text-xl font-semibold'>Cập nhật thông tin cá nhân</h2>
            <form className='mt-4 flex flex-col gap-4' onSubmit={handleUpdateProfile}>
              <div className='grid grid-cols-3 items-center gap-2'>
                <span>Họ và tên:</span>
                <input
                  type='text'
                  className='input input-bordered col-span-3 lg:col-span-2'
                  {...register('fullName')}
                />
                {errors.fullName && <div className='text-error'>{errors.fullName.message}</div>}
              </div>
              <div className='grid grid-cols-3 items-center gap-2'>
                <span>Email:</span>
                <input type='email' className='input input-bordered col-span-3 lg:col-span-2' {...register('email')} />
                {errors.email && <div className='text-error'>{errors.email.message}</div>}
              </div>
              <div className='flex justify-end'>
                <button disabled={updateUserProfileMutation.isPending} className='btn btn-primary'>
                  {updateUserProfileMutation.isPending ? <span className='loading loading-spinner' /> : 'Lưu lại'}
                </button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}
