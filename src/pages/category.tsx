import brandsApi from '@/api/brand.api'
import categoriesApi from '@/api/category.api'
import productsApi from '@/api/products.api'
import Card from '@/components/Card'
import Filter from '@/components/Filter'
import Pagination from '@/components/Pagination'
import PriceFilter from '@/components/PriceFilter'
import ProductCard from '@/components/ProductCard'
import { emptyReponse } from '@/utils/samples/api.sample'
import { sortOptions } from '@/utils/samples/filters.sample'
import { useQuery } from '@tanstack/react-query'
import { useParams, useSearchParams } from 'react-router-dom'

const PAGE_SIZE = 4

export default function Category() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()

  const page = searchParams.get('currentPage') || '0'
  const orderParams: {
    [key: string]: string
  } = {}
  for (const entry of searchParams.entries()) {
    if (orderParams[entry[0]] !== 'currentPage') orderParams[entry[0]] = entry[1]
  }

  const {
    data: categoryResponse,
    isLoading: isLoadingCategory,
    isSuccess,
  } = useQuery({
    queryKey: ['category', id],
    queryFn: () => categoriesApi.get(id || ''),
  })

  const {
    data: { data: brands },
  } = useQuery({
    queryKey: ['brands'],
    queryFn: brandsApi.getAll,
    initialData: emptyReponse([]),
  })

  const {
    data: { data: colors },
  } = useQuery({
    queryKey: ['colors', categoryResponse?.data.id],
    queryFn: () => categoriesApi.getCategoryColors(categoryResponse?.data.id || ''),
    initialData: emptyReponse([]),
    enabled: isSuccess,
  })

  const { data: productsResponse, isPending: isLoadingProducts } = useQuery({
    queryKey: ['category-products', categoryResponse?.data.id, orderParams],
    queryFn: () =>
      productsApi.filter({
        'CategoryId/equals': categoryResponse?.data.id,
        ...orderParams,
        currentPage: page,
        pageSize: PAGE_SIZE,
      }),
    enabled: isSuccess,
  })

  return (
    <section className='my-4 flex flex-col gap-4 px-4 lg:px-0'>
      <Card>
        {isLoadingCategory ? (
          <span className='loading loading-spinner' />
        ) : categoryResponse ? (
          <>
            <h2 className='mb-3 text-xl font-bold'>{categoryResponse?.data.name}</h2>
            <p>{categoryResponse?.data.description}</p>
          </>
        ) : (
          <div className='flex h-full items-center justify-center'>Đã xảy ra lỗi khi tải dữ liệu</div>
        )}
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
      <div className='grid grid-cols-1 gap-4 lg:grid-cols-4'>
        {isLoadingProducts ? (
          <div className='flex items-center justify-center p-4 lg:col-span-4'>
            <span className='loading loading-spinner text-center lg:col-span-4'></span>
          </div>
        ) : productsResponse && productsResponse.data.content.length ? (
          <>
            {productsResponse.data.content.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
            <div className='flex items-center justify-center p-4 lg:col-span-4'>
              <Pagination
                currentPage={productsResponse.data.currentPage}
                totalPages={productsResponse.data.totalPages}
              />
            </div>
          </>
        ) : (
          <div className='flex items-center justify-center p-4 lg:col-span-4'>Không có sản phẩm nào phù hợp</div>
        )}
      </div>
    </section>
  )
}
