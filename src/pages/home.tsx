import ProductCard from '@/components/ProductCard'

export default function Home() {
  return (
    <>
      <div
        className='h-80 rounded-xl'
        style={{
          backgroundImage:
            'url("https://lh3.googleusercontent.com/KU0g__QTkLdAAyt_Oa18jVsgyXlIkWGSoEZNHKSjLtSB91w-442-nKtaUDOFantvGyLslr22rM_kJVkWARby5s75UFrXWUo=w1920-rw")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <section className='my-4'>
        <h2 className='mb-3 text-xl font-bold'>Sản phẩm nổi bật</h2>
        <div className='grid grid-cols-4 gap-4'>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </section>
    </>
  )
}
