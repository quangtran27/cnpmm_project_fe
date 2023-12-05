import brandsApi from '@/api/brand.api'
import productsApi from '@/api/products.api'
import Filter from '@/components/Filter'
import Pagination from '@/components/Pagination'
import PriceFilter from '@/components/PriceFilter'
import ProductCard from '@/components/ProductCard'
import { emptyReponse } from '@/utils/samples/api.sample'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import NotFound from './not-found'

const PAGE_SIZE = '8'

export default function Search() {
  const [searchParams] = useSearchParams()

  const keyword = searchParams.get('keyword')
  const currentPage = searchParams.get('currentPage') || '0'
  const params: {
    [key: string]: string
  } = {}
  for (const entry of searchParams.entries()) {
    if (entry[0] !== 'keyword' && entry[0] !== 'currentPage') params[entry[0]] = entry[1]
  }

  const { data, isLoading } = useQuery({
    queryKey: ['search', keyword, currentPage, params],
    queryFn: () =>
      productsApi.filter({ 'Name/contains': keyword, ...params, currentPage: currentPage, pageSize: PAGE_SIZE }),
    enabled: !!keyword,
  })

  const {
    data: { data: brands },
  } = useQuery({
    queryKey: ['brands'],
    queryFn: brandsApi.getAll,
    initialData: emptyReponse([]),
  })

  return (
    <div className='flex flex-col gap-4'>
      <div className='text-sm'>
        Tìm thấy {data?.data.total} kết quả cho từ khoá: <span className='text-lg text-primary'>{keyword}</span>
      </div>
      <div className='flex gap-4'>
        <Filter
          title='Thương hiệu'
          name='BrandId/equals'
          options={[
            ...brands.map((brand) => {
              return {
                label: brand.name,
                value: brand.id,
              }
            }),
          ]}
        />
        <PriceFilter />
      </div>
      <div className='grid grid-cols-1 gap-4 lg:grid-cols-4'>
        {isLoading ? (
          <div className='p-4 text-center lg:col-span-4'>
            <span className='loading loading-spinner' />
          </div>
        ) : data ? (
          data.data.content.length ? (
            <>
              {data.data.content.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
              <div className='flex items-center justify-center p-4 lg:col-span-4'>
                <Pagination currentPage={data?.data.currentPage} totalPages={data.data.totalPages} />
              </div>
            </>
          ) : (
            <div className='p-4 text-center lg:col-span-4'>Không có sản phẩm phù hợp</div>
          )
        ) : (
          <NotFound />
        )}
      </div>
    </div>
  )
}
