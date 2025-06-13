import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SliderCard from "./SliderCard";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

export default function Slider() {
  const [count, setCount] = useState(0);

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
          640: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
        }}
      >
        <SwiperSlide>
          <div className="pb-12">
            <SliderCard />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="pb-12">
            <SliderCard />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="pb-12">
            <SliderCard />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="pb-12">
            <SliderCard />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="pb-12">
            <SliderCard />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="pb-12">
            <SliderCard />
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
