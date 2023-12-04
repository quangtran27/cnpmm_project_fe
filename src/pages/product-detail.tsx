import categoriesApi from '@/api/category.api'
import productsApi from '@/api/products.api'
import Breadcrumbs from '@/components/BreadCrums'
import Card from '@/components/Card'
import ProductCard from '@/components/ProductCard'
import ProductCart from '@/components/ProductCart'
import ProductImages from '@/components/ProductImages'
import ProductSpecification from '@/components/ProductSpecification'
import { routes } from '@/configs/routes'
import { Category, Product } from '@/types/products.type'
import { toVND } from '@/utils/converters/money.converter'
import { emptyPaginatedResponse, emptyReponse } from '@/utils/samples/api.sample'
import { emptyCategory } from '@/utils/samples/category.sample'
import { emptyProduct } from '@/utils/samples/products.sample'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

export default function ProductDetail() {
  const { categoryId, id } = useParams()

  const {
    data: { data: category },
  } = useQuery({
    queryKey: ['category', categoryId],
    queryFn: () => categoriesApi.get(categoryId || ''),
    initialData: emptyReponse<Category>(emptyCategory),
  })

  const {
    data: { data: product },
  } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productsApi.get(id || ''),
    initialData: emptyReponse<Product>(emptyProduct),
  })

  const {
    data: {
      data: { content: outstandingProducts },
    },
  } = useQuery({
    queryKey: ['outstanding-product'],
    queryFn: () => productsApi.getAll({ currentPage: 0, pageSize: 8 }),
    initialData: emptyPaginatedResponse<Product[]>([]),
  })

  const breadcrumbsItems = [
    {
      label: 'Trang chủ',
      value: routes.home,
    },
    {
      label: category.name,
      value: routes.category.replace(':id', category.id),
    },
    {
      label: product.name,
      value: '',
    },
  ]

  return (
    <>
      <Breadcrumbs items={breadcrumbsItems} />
      <div className='mt-6 grid grid-cols-1 gap-6 px-4 lg:grid-cols-2 lg:px-0'>
        <div className='hidden flex-col gap-6 lg:flex'>
          <ProductImages images={product.images} />
          <Card>
            <h2 className='mb-4 text-xl font-semibold'>Đánh giá chi tiết</h2>
            <div className=''>
              {product.description.split('\n').map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          </Card>
        </div>
        <div className='lg:hidden'>
          <ProductImages images={product.images} />
        </div>
        <div>
          <Card size='none' className='p-3 lg:p-6'>
            <h1 className='text-center text-lg font-semibold lg:text-left lg:text-2xl'>{product.name}</h1>
            <div className='mt-4 flex items-center justify-center gap-4 lg:justify-start'>
              {product.onSale ? (
                <>
                  <div className='font-semibold text-gray-500 line-through'>{toVND(product.price)}</div>
                  <div className='text-2xl font-semibold text-secondary'>{toVND(product.salePrice)}</div>
                </>
              ) : (
                <div className='ml-2 text-2xl font-semibold text-secondary'>{toVND(product.price)}</div>
              )}
            </div>
            <div className='divider' />
            <div>
              <ProductCart key={product.id} producId={product.id} quantity={product.quantity} />
            </div>
            <div className='divider' />
            <ProductSpecification specifications={product.productSpecs} attributes={category.productAttributes} />
          </Card>
        </div>
      </div>
      <div className='my-6 px-4 lg:px-0'>
        <h3 className='mb-4 text-xl font-medium'>Sản phẩm nổi bật</h3>
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-4'>
          {outstandingProducts
            .filter((p) => p.id !== product.id)
            .map((p) => (
              <ProductCard key={p.id} {...p} />
            ))}
        </div>
      </div>
    </>
  )
}
