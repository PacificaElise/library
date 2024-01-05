import React from 'react';
import {ReactComponent as Star} from '../../imgs/star.svg';

import './rating.scss';

export const Rating = (props) => {
  const { rating } = props;

  return (
  <p className='raiting'>
    {(rating === 0 || rating === null) ? (
      <span>ещё нет оценок</span>
      ) :
      (
      <React.Fragment>
        <Star className={rating > 0 || rating >= 1.5 ? 'fullfield' : ''}/>
        <Star className={rating > 1.5 ||rating >= 2.5  ? 'fullfield' : ''}/>
        <Star className={rating > 2.5 || rating >= 3.5 ? 'fullfield' : ''}/>
        <Star className={rating > 3.5 || rating >= 4.5 ? 'fullfield' : ''}/>
        <Star className={rating > 4.5 || rating === 5 ? 'fullfield' : ''}/>
      </React.Fragment>)
    }
  </p>
  )
}
  
  // сделать норм рейтинг
