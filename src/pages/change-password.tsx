import AccountMenu from '@/components/AccountMenu'
import Card from '@/components/Card'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

export default function ChangePassword() {
  const [showPassword, setShowPassword] = useState(false)
  const [showRetypedPassword, setShowRetypedPassword] = useState(false)
  const [showOldPassword, setShowOldPassword] = useState(false)

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex gap-4'>
        <div className='w-1/3'>
          <AccountMenu />
        </div>
        <div className='w-2/3'>
          <Card>
            <h2 className='text-xl font-semibold'>Cập nhật Mật khẩu</h2>
            <div className='my-4 flex flex-col gap-4'>
              <div className='grid grid-cols-3 items-center'>
                <span>Mật khẩu cũ:</span>
                <div className='relative col-span-2'>
                  <input type={showOldPassword ? 'text' : 'password'} className='input input-bordered w-full pr-10' />
                  <span
                    className='absolute bottom-0 right-0 top-0 mr-3 flex cursor-pointer items-center justify-center'
                    onClick={() => {
                      setShowOldPassword((prev) => !prev)
                    }}
                  >
                    <FontAwesomeIcon icon={showOldPassword ? faEyeSlash : faEye} />
                  </span>
                </div>
              </div>
              <div className='grid grid-cols-3 items-center'>
                <span>Mật khẩu cũ:</span>
                <div className='relative col-span-2'>
                  <input type={showPassword ? 'text' : 'password'} className='input input-bordered w-full pr-10' />
                  <span
                    className='absolute bottom-0 right-0 top-0 mr-3 flex cursor-pointer items-center justify-center'
                    onClick={() => {
                      setShowPassword((prev) => !prev)
                    }}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </span>
                </div>
              </div>
              <div className='grid grid-cols-3 items-center'>
                <span>Nhập lại mật khẩu mới:</span>
                <div className='relative col-span-2'>
                  <input
                    type={showRetypedPassword ? 'text' : 'password'}
                    className='input input-bordered w-full pr-10'
                  />
                  <span
                    className='absolute bottom-0 right-0 top-0 mr-3 flex cursor-pointer items-center justify-center'
                    onClick={() => {
                      setShowRetypedPassword((prev) => !prev)
                    }}
                  >
                    <FontAwesomeIcon icon={showRetypedPassword ? faEyeSlash : faEye} />
                  </span>
                </div>
              </div>
            </div>
            <div className='flex justify-end'>
              <button className='btn btn-primary'>Lưu lại</button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
