import brandsApi from '@/api/brand.api'
import productsApi from '@/api/products.api'
import Filter from '@/components/Filter'
import PriceFilter from '@/components/PriceFilter'
import ProductCard from '@/components/ProductCard'
import { emptyReponse } from '@/utils/samples/api.sample'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import Loading from './loading'
import NotFound from './not-found'

export default function Search() {
  const [searchParams] = useSearchParams()

  const keyword = searchParams.get('keyword')
  const params: {
    [key: string]: string
  } = {}
  for (const entry of searchParams.entries()) {
    if (entry[0] !== 'keyword') params[entry[0]] = entry[1]
  }

  const { data, isLoading } = useQuery({
    queryKey: ['search', keyword, params],
    queryFn: () => productsApi.filter({ 'Name/contains': keyword, ...params }),
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
        Tìm thấy {data?.data.content.length} kết quả cho từ khoá:{' '}
        <span className='text-lg text-primary'>{keyword}</span>
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
      {isLoading ? (
        <Loading />
      ) : data ? (
        data.data.content.length ? (
          <div className='grid grid-cols-4 gap-4'>
            {data.data.content.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        ) : (
          <div className='p-4 text-center'>Không có sản phẩm phù hợp</div>
        )
      ) : (
        <NotFound />
      )}
    </div>
  )
}
