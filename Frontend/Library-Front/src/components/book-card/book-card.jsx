/* eslint-disable */

import { useCallback } from 'react';

import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {BASE_URL} from '../../config';

import { Rating } from '../raiting/raiting';
import { Button } from '../button/button';

import nocover from '../../imgs/nocover.jpg';

import './book-card.scss';
import { selectSearch } from '../../features/controls/controls-slice';
import { selectMeData } from '../../features/me/me-slice';

export const BookCard = (props) => {

  const { 
    id, 
    image = {},
    title, 
    path,
    authors = [], 
    issueYear, 
    rating, 
    dateOrder,
    choosenView,
    booking,
    customerId,
    bookingId,
    delivery,
    setModalActive,
    getBookId,     
    getCustomerId,
    getDateOrder,
    getBookingId,
    onBigModal,
    dateHandedTo,
    overdue,
  } = props;

  const search = useSelector(selectSearch);
  const meData = useSelector(selectMeData);

  const Hightlight = () => {
    if (!search) return title;
    const regexp = new RegExp(search, 'ig');
    const matchValue = title.match(regexp);  
    if (matchValue) {
  
      return title.split(regexp).map((t, index, array) => {
        if (index < array.length - 1) {
          const c = matchValue.shift()
          return <>{t}<span data-test-id='highlight-matches' className='hightlight' key={index}>{c}</span></>
        }
        return t
      })
    }
    return title
  }

  const light = useCallback((title) => {
    return <Hightlight search={search} title={title} />
  }, [search])

  return (
    <div data-test-id='card' className={choosenView === 1 ? 'book-card-list' : 'book-card'}>
      <NavLink to={`/books/${path}/${id}`} className={choosenView === 1 ? 'card-link-list' : 'card-link'}>
      <div className='image-container'>
        {(image === null) ? (
          <img
              className='book-cover'
              src={nocover}
              alt='not cover'
          />
        ) : (
          <img className='book-cover' src={/*BASE_URL+*/Object.values(image)[0]} 
          alt='cover of book'
          />
        )}
      </div>
      <div className={choosenView === 1 ? 'book-card-content-container' : ''}>
        {choosenView === 0 ? <Rating rating={rating}/> : null}
        <div className='book-card-content'>
          <div className='book-title-container'>
            <p className='book-title'>
              {light(title)}
            </p>
          </div>
          <p className='book-author'>
              {authors.join(', ')}, <span>{issueYear}</span>
          </p>
        </div>
        {choosenView === 1 ? <Rating rating={rating}/> : null}
      </div>
      </NavLink>
      <button data-test-id='booking-button' className={(booking === null && delivery === null) ?
      (choosenView === 1 ? 'book-card-btn-list' : 'book-card-btn') : 
        customerId === meData?.id ? 
        (choosenView === 1 ? 'btn-active-user-list' : 'btn-active-user') : 
        (choosenView === 1 ? 'btn-disabled-list' : 'btn-disabled')} disabled={((booking !== null && (customerId !== meData?.id)) || delivery !== null || overdue === true) ? true : false} onClick={()=>{
          setModalActive(true); 
          getBookId(id); 
          getCustomerId(customerId); 
          getDateOrder(dateOrder);
          getBookingId(bookingId);
          {(meData?.id === customerId) ? onBigModal(true) : onBigModal(false)}}}>
        {(booking === null && delivery === null) ? 'забронировать' : 
          (booking === null && delivery !== null) ?
          (`занята до ${new Date(dateHandedTo).toLocaleDateString('ru-RU').slice(0,5)}`) :
          'забронирована'}
      </button>
    </div>
  );
}
