import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import '../Category/style.css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const CategoryCard = ({ categories }) => {
  return (
    <div className="relative">
      <Swiper
        spaceBetween={20}
        pagination={{ clickable: true }}
        navigation
        modules={[Navigation, Pagination]}
        breakpoints={{
          0: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
      >
        {categories.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative flex flex-col items-center justify-center h-40 overflow-hidden text-center transition-all rounded-lg shadow-md group hover:scale-105"
              style={{
                backgroundImage: `url(${item.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 transition-all bg-black/40 group-hover:bg-black/30" />
              <div className="relative z-10 flex flex-col items-center space-y-2 text-white">
                <div className="text-blue-300">
                  {item.icon}
                </div>
                <h4 className="text-lg font-semibold">{item.name}</h4>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>     
    </div>
  );
};

export default CategoryCard;
