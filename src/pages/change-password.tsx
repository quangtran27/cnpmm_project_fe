import userApi from '@/api/user.api'
import AccountMenu from '@/components/AccountMenu'
import Card from '@/components/Card'
import { ApiResponse } from '@/types/api.type'
import { UpdateUserPasswordSchema, updateUserPasswordSchema } from '@/utils/validators/user.validator'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

export default function ChangePassword() {
  const [showPassword, setShowPassword] = useState(false)
  const [showOldPassword, setShowOldPassword] = useState(false)

  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm<UpdateUserPasswordSchema>({
    mode: 'onSubmit',
    resolver: yupResolver(updateUserPasswordSchema),
  })

  const updateUserPasswordMutation = useMutation({
    mutationFn: (data: UpdateUserPasswordSchema) => userApi.updateUserPassword(data),
    onSuccess: () => {
      toast.success('Cập nhật mật khẩu thành công!')
      reset()
    },
    onError: (res: AxiosError) => {
      toast.error('Đã xảy ra lỗi: ' + (res.response?.data as ApiResponse<string>).message)
    },
  })

  const handleUpdatePassword = handleSubmit((data) => {
    updateUserPasswordMutation.mutate(data)
  })

  return (
    <div className='flex flex-col gap-4 px-4 lg:p-0'>
      <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
        <div>
          <AccountMenu />
        </div>
        <div className='lg:col-span-2'>
          <Card size='none' className='p-3 lg:p-6'>
            <h2 className='text-xl font-semibold'>Cập nhật Mật khẩu</h2>
            <form className='mt-4 flex flex-col gap-4' onSubmit={handleUpdatePassword}>
              <div className='grid grid-cols-3 items-center gap-2'>
                <span>Mật khẩu cũ:</span>
                <div className='relative col-span-3 lg:col-span-2'>
                  <input
                    type={showOldPassword ? 'text' : 'password'}
                    className='input input-bordered w-full pr-10'
                    {...register('password')}
                  />
                  <span
                    className='absolute bottom-0 right-0 top-0 mr-3 flex cursor-pointer items-center justify-center'
                    onClick={() => {
                      setShowOldPassword((prev) => !prev)
                    }}
                  >
                    <FontAwesomeIcon icon={showOldPassword ? faEyeSlash : faEye} />
                  </span>
                </div>
                {errors.password && <div className='text-error'>{errors.password.message}</div>}
              </div>
              <div className='grid grid-cols-3 items-center gap-2'>
                <span>Mật khẩu mới:</span>
                <div className='relative col-span-3 lg:col-span-2'>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className='input input-bordered w-full pr-10'
                    {...register('newPassword')}
                  />
                  <span
                    className='absolute bottom-0 right-0 top-0 mr-3 flex cursor-pointer items-center justify-center'
                    onClick={() => {
                      setShowPassword((prev) => !prev)
                    }}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </span>
                </div>
                {errors.newPassword && <div className='text-error'>{errors.newPassword.message}</div>}
              </div>
              <div className='flex justify-end'>
                <button className='btn btn-primary' disabled={updateUserPasswordMutation.isPending}>
                  {updateUserPasswordMutation.isPending ? <span className='loading loading-spinner' /> : 'Lưu lại'}
                </button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}
