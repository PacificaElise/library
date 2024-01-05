
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper';
import {BASE_URL} from '../../config'


import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './slider-navigation.scss';

export const SliderNavigation = ({images}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState('');

  return(
  <React.Fragment>
    <Swiper className='slider-navigation' data-test-id='slide-big'
      spaceBetween={10}
      navigation={true}
      grabCursor={true}
      thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : '' }}
      modules={[FreeMode, Navigation, Thumbs]}
    >
      {
        images.map((image) => (
          <SwiperSlide key={image.url}>
            <img src={Object.values(image)} alt='cover book'/>
          </SwiperSlide>
        ))
      }
    </Swiper>

    { images.length > 1 &&
      <Swiper className='slider-navigation-thumbs'
        onSwiper={setThumbsSwiper}
        spaceBetween={30}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        centeredSlides={true}
      >
      {
        images.map((image) => (
          <SwiperSlide key={image.url} data-test-id='slide-mini'>
            <img src={Object.values(image)} alt='cover book' />
          </SwiperSlide>
        ))
      }
    </Swiper>
    }
  </React.Fragment>
)}
