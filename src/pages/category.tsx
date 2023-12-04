import brandsApi from '@/api/brand.api'
import categoriesApi from '@/api/category.api'
import productsApi from '@/api/products.api'
import Card from '@/components/Card'
import Filter from '@/components/Filter'
import PriceFilter from '@/components/PriceFilter'
import ProductCard from '@/components/ProductCard'
import { Product } from '@/types/products.type'
import { emptyPaginatedResponse, emptyReponse } from '@/utils/samples/api.sample'
import { emptyCategory } from '@/utils/samples/category.sample'
import { useQuery } from '@tanstack/react-query'
import { useParams, useSearchParams } from 'react-router-dom'
import Loading from './loading'
import NotFound from './not-found'
import { sortOptions } from '@/utils/samples/filters.sample'

export default function Category() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()

  const params: {
    [key: string]: string
  } = {}
  for (const entry of searchParams.entries()) {
    params[entry[0]] = entry[1]
  }

  const {
    data: { data: category },
    isPending,
    isError,
  } = useQuery({
    queryKey: ['category', id],
    queryFn: () => categoriesApi.get(id || ''),
    initialData: emptyReponse(emptyCategory),
  })

  const {
    data: { data: brands },
  } = useQuery({
    queryKey: ['brands'],
    queryFn: brandsApi.getAll,
    initialData: emptyReponse([]),
  })

  const {
    data: {
      data: { content: products },
    },
    isPending: isLoadingProducts,
  } = useQuery({
    queryKey: ['category-products', category.id, params],
    queryFn: () => productsApi.filter({ 'CategoryId/equals': category.id, ...params }),
    initialData: emptyPaginatedResponse<Product[]>([]),
    enabled: !!category.id,
  })

  const {
    data: { data: colors },
  } = useQuery({
    queryKey: ['colors', category.id],
    queryFn: () => categoriesApi.getCategoryColors(category.id || ''),
    initialData: emptyReponse([]),
    enabled: !!category.id,
  })

  if (isPending) return <Loading />
  if (isError) return <NotFound />

  return (
    <section className='my-4 flex flex-col gap-4 px-4 lg:px-0'>
      <Card>
        <h2 className='mb-3 text-xl font-bold'>{category.name}</h2>
        <p>{category.description}</p>
      </Card>

      <div className='flex flex-wrap items-center gap-4'>
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
        <Filter
          title='Màu sắc'
          name='Color/equals'
          options={[
            ...colors.map((color) => {
              return {
                label: color,
                value: color,
              }
            }),
          ]}
        />
        <Filter title='Sắp xếp' clearLabel='Mặc định' name='sort' options={sortOptions} />
      </div>
      {isLoadingProducts ? (
        <span className='loading loading-spinner'></span>
      ) : !products.length ? (
        <div className='flex items-center justify-center p-4'>Không có sản phẩm nào phù hợp</div>
      ) : (
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-4'>
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      )}
    </section>
  )
}
