import orderApi from '@/api/order.api'
import AccountMenu from '@/components/AccountMenu'
import Order from '@/components/Order'
import { selectAuth } from '@/features/auth/authSlice'
import { useAppSelector } from '@/hooks/useAppSelector'
import { ApiResponse } from '@/types/api.type'
import { emptyReponse } from '@/utils/samples/api.sample'
import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import Loading from './loading'

export default function Orders() {
  const auth = useAppSelector(selectAuth)

  const {
    data: { data: orders },
    isPending,
    refetch,
  } = useQuery({
    queryKey: ['orders', auth.user.id],
    queryFn: () => orderApi.getAll(),
    initialData: emptyReponse([]),
  })

  const cancelOrderMutation = useMutation({
    mutationFn: (id: string) => orderApi.cancel(id),
    onSuccess: () => {
      toast.success('Huỷ đơn hàng thành công!')
      refetch()
    },
    onError: (err: AxiosError) => {
      toast.error('Huỷ không thành công: ' + (err.response?.data as ApiResponse<string>).data)
    },
  })

  const handleCancelOrder = (id: string) => {
    if (window.confirm('Bạn có thực sự muốn huỷ đơn hàng này?')) {
      cancelOrderMutation.mutate(id)
    }
  }

  if (isPending) return <Loading />

  return (
    <div className='flex flex-col gap-4 px-4 lg:px-0'>
      <div className='grid grid-cols-3 gap-4'>
        <div className='col-span-3 lg:col-span-1'>
          <AccountMenu />
        </div>
        <div className='col-span-3 lg:col-span-2'>
          <div className='mb-2 text-lg font-semibold'>Đơn hàng ({orders.length})</div>
          <div className='col-span-3 flex flex-col gap-4 lg:col-span-1'>
            {orders.map((order) => (
              <Order key={order.id} {...order} handleDelete={handleCancelOrder} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
