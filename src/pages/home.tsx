import productsApi from '@/api/products.api'
import ProductCard from '@/components/ProductCard'
import { Product } from '@/types/products.type'
import { emptyPaginatedResponse } from '@/utils/samples/api.sample'
import { useQuery } from '@tanstack/react-query'

export default function Home() {
  const {
    data: {
      data: { content: products },
    },
  } = useQuery({
    queryKey: ['outstanding-product'],
    queryFn: () => productsApi.getAll({ currentPage: 0, pageSize: 8 }),
    initialData: emptyPaginatedResponse<Product[]>([]),
  })

  return (
    <>
      <div
        className='h-80 lg:rounded-xl'
        style={{
          backgroundImage:
            'url("https://lh3.googleusercontent.com/KU0g__QTkLdAAyt_Oa18jVsgyXlIkWGSoEZNHKSjLtSB91w-442-nKtaUDOFantvGyLslr22rM_kJVkWARby5s75UFrXWUo=w1920-rw")',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      />
      <section className='my-4 px-4 lg:px-0'>
        <h2 className='my-4 text-xl font-semibold'>Sản phẩm nổi bật</h2>
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-4'>
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>
      <div className='h-32'></div>
    </>
  )
}
