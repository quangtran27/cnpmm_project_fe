import { Navigation } from 'swiper/modules'
import Card from './Card'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'

type ProductImagesProps = {
  images: string[]
}

export default function ProductImages({ images }: ProductImagesProps) {
  return (
    <div>
      <Card size='none'>
        {images.length ? (
          <Swiper navigation={true} modules={[Navigation]} className='mySwiper'>
            {images.map((image, index) => (
              <SwiperSlide
                key={'product-image' + index}
                className='flex w-full justify-center overflow-hidden rounded-xl'
              >
                <img src={image} className='max-h-[720px]' />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div>Sản phẩm hiện tại chưa có hình ảnh</div>
        )}
      </Card>
    </div>
  )
}
