import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';

import {BASE_URL} from '../../config'

import 'swiper/css';
import 'swiper/css/pagination';

import './slider-pagination.scss';


export const SliderPagination = ({images}) => (
      <Swiper className='slider-pagination' data-test-id='slide-big'
        modules={[Pagination]} 
        pagination={{ clickable: true }}
        >
        {
        images.map((image) => (
          <SwiperSlide key={image.url} data-test-id='slide-mini'> 
            <img src={Object.values(image)} alt='cover book'/>
          </SwiperSlide>
        ))
      }
      </Swiper>
  );
