export default function ProductFilters() {
  return (
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
  )
}
