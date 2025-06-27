import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SliderCard from "./SliderCard";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import useProducts from "./hooks/useProducts";

export default function Slider() {
  const [count, setCount] = useState(0);
  const { products, loading } = useProducts();

  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
        breakpoints={{
          520: {
            slidesPerView: 2,
            spaceBetween: 25,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1380: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
        }}
      >
        {products.map((aProduct) => (
          <SwiperSlide>
            <div className="pb-12">
              <SliderCard key={aProduct.id} aProduct={aProduct.es} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
