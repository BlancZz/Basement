import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// import 'swiper/css';
// import 'swiper/css/effect-coverflow';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
import Bees from './Bees.png';

import { EffectCoverflow, Pagination, Navigation } from 'swiper';

import 'swiper/swiper.min.css';
import 'swiper/components/effect-coverflow/effect-coverflow.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/navigation/navigation.min.css';

function Slider() {
  return (
    <div className="container">
      <h1 className="heading">Flower Gallery</h1>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ el: '.swiper-pagination', clickable: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper_container"
      >
        <SwiperSlide>
          <img src={Bees} alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Bees} alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Bees} alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Bees} alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Bees} alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Bees} alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Bees} alt="slide_image" />
        </SwiperSlide>

        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            <ion-icon name="arrow-back-outline"></ion-icon>
          </div>
          <div className="swiper-button-next slider-arrow">
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </Swiper>
    </div>
  );
}

export default Slider;
