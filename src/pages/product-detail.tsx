import Card from '@/components/Card'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

export default function ProductDetail() {
  return (
    <>
      <div className='breadcrumbs text-sm'>
        <ul>
          <li>
            <a>Trang chủ</a>
          </li>
          <li>
            <a>Laptop</a>
          </li>
          <li>Macbook Pro M1</li>
        </ul>
      </div>
      <div className='mt-6 flex gap-6'>
        <div className='flex w-3/5 flex-col gap-6'>
          <Swiper navigation={true} modules={[Navigation]} className='mySwiper'>
            <SwiperSlide className='w-full overflow-hidden rounded-xl'>
              <img
                src='https://cdn.tgdd.vn/Products/Images/44/282828/Slider/vi-vn-apple-macbook-pro-13-inch-m2-2022-01.jpg'
                alt=''
              />
            </SwiperSlide>
            <SwiperSlide className='w-full overflow-hidden rounded-xl'>
              <img
                src='https://cdn.tgdd.vn/Products/Images/44/282828/Slider/vi-vn-apple-macbook-pro-13-inch-m2-2022-02.jpg'
                alt=''
              />
            </SwiperSlide>
            <SwiperSlide className='w-full overflow-hidden rounded-xl'>
              <img
                src='https://cdn.tgdd.vn/Products/Images/44/282828/Slider/vi-vn-apple-macbook-pro-13-inch-m2-2022-03.jpg'
                alt=''
              />
            </SwiperSlide>
            <SwiperSlide className='w-full overflow-hidden rounded-xl'>
              <img
                src='https://cdn.tgdd.vn/Products/Images/44/282828/Slider/vi-vn-apple-macbook-pro-13-inch-m2-2022-04.jpg'
                alt=''
              />
            </SwiperSlide>
          </Swiper>
          <Card>
            <h2 className='mb-4 text-xl font-semibold'>Đánh giá chi tiết</h2>
            <p className=''>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit repudiandae commodi quod
              cupiditate pariatur modi et eaque natus voluptatem officia animi impedit praesentium sequi qui, nihil
              quaerat dignissimos amet aliquid tenetur voluptas ut error? Porro et dolor illo aperiam in qui vero quod
              veniam voluptates eaque doloremque consectetur deserunt quibusdam sequi, tenetur magni aliquid tempora
              sapiente, pariatur laudantium neque maiores ullam obcaecati dolorem. Expedita consequatur veniam rerum
              veritatis magnam corrupti, possimus nihil corporis pariatur esse voluptate accusamus vel sint laboriosam
              neque, quod reiciendis adipisci quidem commodi suscipit impedit recusandae dolore, totam incidunt? Qui
              explicabo harum cum ducimus incidunt nesciunt voluptatibus!
            </p>
          </Card>
        </div>
        <div className='w-2/5'>
          <Card>
            <h1 className='text-2xl font-bold'>MacBook Pro M1</h1>
            <h2 className='text-base font-semibold'>
              Giá bán: <span className='ml-2 text-2xl text-secondary'>49.999.000đ</span>
            </h2>
            <div className='divider' />
            <div className='flex gap-6'>
              <div className='flex items-center gap-4'>
                <div>Số lượng:</div>
                <div className='flex rounded-xl border'>
                  <button className='btn btn-square text-lg'>-</button>
                  <input type='text' className='w-12 px-2 text-center outline-none' value={0} />
                  <button className='btn btn-square text-lg'>+</button>
                </div>
              </div>
              <button className='btn btn-primary flex-1'>Thêm vào giỏ hàng</button>
            </div>
            <div className='divider' />
            <div>
              <h3 className='text-lg font-semibold'>Thông tin sản phẩm</h3>
              <div className='mt-4 overflow-x-auto'>
                <table className='table table-zebra'>
                  <tbody>
                    <tr>
                      <td>CPU</td>
                      <td>Apple M2100GB/s</td>
                    </tr>
                    <tr>
                      <td>RAM</td>
                      <td>8 GB</td>
                    </tr>
                    <tr>
                      <td>Ổ cứng:</td>
                      <td>256 GB SSD</td>
                    </tr>
                    <tr>
                      <td>Card màn hình:</td>
                      <td>Card tích hợp, 10 nhân GPU</td>
                    </tr>
                    <tr>
                      <td>Cổng kết nối:</td>
                      <td>2 x Thunderbolt 3Jack tai nghe 3.5 mm</td>
                    </tr>
                    <tr>
                      <td>Kích thước, khối lượng:</td>
                      <td>Dài 304.1 mm - Rộng 212.4 mm - Dày 15.6 mm - Nặng 1.4 kg</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}
