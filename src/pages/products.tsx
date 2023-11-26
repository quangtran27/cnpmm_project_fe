import Card from '@/components/Card'
import ProductCard from '@/components/ProductCard'

export default function Products() {
  return (
    <>
      <section className='my-4 flex flex-col gap-4'>
        <Card>
          <h2 className='mb-3 text-xl font-bold'>Laptop</h2>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda soluta quae, unde architecto velit
            delectus possimus error labore earum cumque, nemo ut dolores nesciunt culpa ea. Rem cupiditate recusandae
            ad? Debitis aperiam molestiae, hic quaerat alias itaque reiciendis minima adipisci!
          </p>
        </Card>

        <div className='flex'>
          <div className='flex flex-1 items-center gap-3'>
            <select className='select select-bordered select-sm'>
              <option disabled selected>
                Thương hiệu
              </option>
              <option>Han Solo</option>
              <option>Greedo</option>
            </select>
            <select className='select select-bordered select-sm'>
              <option disabled selected>
                Khoảng giá
              </option>
              <option>Han Solo</option>
              <option>Greedo</option>
            </select>
            <select className='select select-bordered select-sm'>
              <option disabled selected>
                Thương hiệu
              </option>
              <option>Han Solo</option>
              <option>Greedo</option>
            </select>
          </div>
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
      </section>
    </>
  )
}
