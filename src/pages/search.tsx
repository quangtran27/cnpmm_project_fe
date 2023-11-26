import Card from '@/components/Card'
import ProductCard from '@/components/ProductCard'

export default function Search() {
  return (
    <div className='flex flex-col gap-4'>
      <Card>
        <div className='mb-4 text-lg'>
          Kết quả tìm kiếm cho: <span className='text-xl font-semibold italic'>Laptop</span>
        </div>
        <div className='text-sm'>Tìm thấy 27 kết quả</div>
      </Card>
      <div className='flex'>
        <select className='select select-bordered select-sm'>
          <option disabled selected>
            Sắp xếp theo
          </option>
          <option>Nổi bật nhất</option>
          <option>Giá thấp → cao</option>
          <option>Giá cao → thấp</option>
        </select>
      </div>
      <div className='grid grid-cols-4 gap-4'>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  )
}
