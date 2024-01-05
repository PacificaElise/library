/* eslint-disable */

import { NavLink, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import 'moment/locale/ru';

import { Comment } from '../../components/comment/comment'
import { Rating } from '../../components/raiting/raiting';
import { ErrorToast } from '../../components/error-toast/error-toast';
import { SliderNavigation } from '../../components/slider/slider-navigation';
import { SliderPagination } from '../../components/slider/slider-pagination';
import { useResize } from '../../hooks/use-resize';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import {ReactComponent as Arrow} from '../../imgs/icons/arrow.svg';
import { Modal } from '../../components/modal/modal';
import { RatingModal } from '../../components/modal/rating-modal';
import { Calendar } from '../../components/calendar/calendar';
import { Rate } from '../../components/rate/rate';

import nocover from '../../imgs/nocover.jpg';

import { selectBookDetails, clearDetails, loadBookById, selectDetailsInfo } from '../../features/details/details-slice';

import './book-page.scss';
import { clearSearch, selectControls } from '../../features/controls/controls-slice';
import { selectBookingData } from '../../features/booking/booking-slice';
import { selectRebookingData } from '../../features/rebooking/rebooking-slice';
import { selectDeleteBookingData } from '../../features/delete-booking/delete-booking-slice';
import { loadRating, selectRate } from '../../features/rating/rating-slice';
import { CommentsAlertToast } from '../../components/alerts-toast/alerts-comments-toast';
import { setAlertCommentsToast } from '../../features/toggle-alert-toast/toggle-alert-comments-slice';
import { selectMeData } from '../../features/me/me-slice';

export const BookPage = () => {
    const { bookId } = useParams();

    const dispatch = useDispatch();
    const { currentBook } = useSelector(selectBookDetails);
    const {errorBookId, statusBookId} = useSelector(selectDetailsInfo);
    const bookingData = useSelector(selectBookingData);
    const rebookingData = useSelector(selectRebookingData);
    const deleteBookingData = useSelector(selectDeleteBookingData);
    const selectRating = useSelector(selectRate);
    const { category, path} = useSelector(selectControls);
    const { isScreenMd } = useResize();
    const [isOpenDropdownComments, setOpenDropdownComments] = useState(true);
    const [isModalActive, setModalActive] = useState(false);
    const [isRatingModalActive, setRatingModalActive] = useState(false);
    const [value, setValue] = useState(moment());
    const [bigModal, setBigModal] = useState(false);
    const [rate, setRate] = useState(0);
    const [comment, setComment] = useState('');
    const switchOnAlertCommentsToast = () => dispatch(setAlertCommentsToast(true));
    const meData = useSelector(selectMeData);

    useEffect(() => {
      dispatch(loadBookById(bookId));
      return () => {
        dispatch(clearDetails());
        dispatch(clearSearch())
      }
    }, [bookId, bookingData, rebookingData, deleteBookingData, selectRating, dispatch]);

    const ratingData = {
      data: {
        rating: rate,
        text: comment,
        book: bookId,
        user: meData.id,
      }
    }
    

    const onSubmit = async (data) => {
      await dispatch(loadRating(data));
      setRate(0);
      setRatingModalActive(false);
      setComment('');
      switchOnAlertCommentsToast();
    }

    const title='Выбор даты бронирования'
    const title2='Изменение даты бронирования';
    const title3='Оцените книгу';

    return (
        <section className='book-page'>
          <div className='book-path'>
            <span><NavLink to={`/books/${path}`} data-test-id='breadcrumbs-link'>{category}</NavLink>  &#160;/ &#160; <span data-test-id='book-name'>{currentBook ? currentBook.title : ''}</span></span>
          </div>
          {errorBookId && statusBookId !== 'loading' ? <ErrorToast /> : null}
          <CommentsAlertToast/>
          {statusBookId === 'received' && (
          <React.Fragment>
            <section className='book-description'>
                {currentBook.images === null ?
                  <div className='image-container'>
                  <img
                    className='nocover'
                    src={nocover}
                    alt='not cover'
                  />
                  </div> : 
                  <div className='image-container'>
                    {isScreenMd ?
                      <SliderPagination images={currentBook.images}/> :
                      <SliderNavigation images={currentBook.images}/>
                    }
                  </div>
                }
                <div className='description-title-container'>
                  <h2 className='description-title' data-test-id='book-title'>{currentBook.title}</h2>
                  <p className='description-author'>{currentBook.authors.join(', ')}, {currentBook.issueYear}</p>

                  <button data-test-id='booking-button' className={(currentBook.booking === null && currentBook.delivery === null) ? 'description-title-container-btn' : 
                  currentBook.booking?.customerId === meData?.id
                  ? 'btn-active-user' : 'btn-disabled'} 
                  disabled={((currentBook.booking !== null && (currentBook.booking?.customerId !== meData?.id)) || currentBook.delivery !== null) ? true : false} onClick={()=>{{setModalActive(true); (meData?.id === currentBook.booking?.customerId) ? setBigModal(true) : setBigModal(false)}}}>
                    {currentBook.booking === null && currentBook.delivery === null ? 'забронировать' : 
                      (currentBook.booking === null && currentBook.delivery !== null) ?
                      (`занята до ${new Date(currentBook.delivery?.dateHandedTo).toLocaleDateString('ru-RU').slice(0,5)}`):
                      'забронирована'}
                  </button>
                </div>
                <div className='description-about'>
                  <h4>О книге</h4>
                  <p>{currentBook.description}</p>
                </div>
            </section>
            <section className='book-feedback-container'>
              <div className="book-raiting-container ">
                <h4 className='raiting-title'>Рейтинг</h4>
                <div className='raiting'><Rating rating={currentBook.rating}/><h4>{currentBook.rating === null ? 0 : currentBook.rating}</h4></div>
              </div>
              <div className='book-detailed-container'>
                <h4 className='detailed-title'>Подробная информация</h4>
                <div className='detailed'>
                  <div className='detailed-column'>
                    <div className='detailed-column-keys'>
                      <p>Издательство</p>
                      <p>Год издания</p>
                      <p>Страниц</p>
                      <p>Переплёт</p>
                      <p>Формат</p>
                    </div>
                    <div className='detailed-column-values'>
                      <p>{currentBook.publish}</p>
                      <p>{currentBook.issueYear}</p>
                      <p>{currentBook.pages}</p>
                      <p>{currentBook.cover}</p>
                      <p>{currentBook.format}</p>
                    </div>
                  </div>
                  <div className='detailed-column'>
                    <div className='detailed-column-keys'>
                      <p>Жанр</p>
                      <p>Вес</p>
                      <p>ISBN</p>
                      <p>Изготовитель</p>
                    </div>
                    <div className='detailed-column-values'>
                      <p>{currentBook.categories}</p>
                      <p>{currentBook.weight}</p>
                      <p>{currentBook.ISBN}</p>
                      <p>{currentBook.producer}</p>
                    </div>
                </div>
                </div>
              </div>
              <div data-test-id='reviews' className='book-comments-container'>
                <h4 className='comments-title'>Отзывы<span>{currentBook.comments === null ? 0 : currentBook.comments.length}</span> 
                  {currentBook.comments === null ? 
                  null : 
                  <button type='button' aria-label='dropdownComments' data-test-id='button-hide-reviews' onClick={() => setOpenDropdownComments(!isOpenDropdownComments)}><Arrow className={isOpenDropdownComments ? 'arrow-up' : ''}/></button>
                  }            
                </h4>
                {currentBook.comments === null ? 
                  null : 
                  <div data-test-id='comment-wrapper' className={isOpenDropdownComments ? 'comments-wrapper' : 'not-visible'}>
                    {
                    currentBook.comments.map((comment) => <Comment key={comment.id} {...comment}/>).reverse()
                    }  
                  </div>}
                  <button type='submit' className='grade-btn' data-test-id='button-rating' onClick={() => setRatingModalActive(true)} disabled={
                  currentBook?.comments?.some(comment => comment.user.commentUserId === meData?.id)}>оценить книгу</button>
              </div>
            </section>
          </React.Fragment>
          )}
          <Modal isModalActive={isModalActive} setModalActive={setModalActive} title={bigModal ? title2 : title} bigModal={bigModal}>            
          <Calendar value={value} onChange={setValue} bigModal={bigModal} bookId={bookId} setModalActive={setModalActive} customerId={currentBook?.booking?.customerId} dateOrder={currentBook?.booking?.dateOrder} bookingID={currentBook?.booking?.id}/> </Modal>
          
          <RatingModal isRatingModalActive={isRatingModalActive} setRatingModalActive={setRatingModalActive} title={title3}>
            <div className='rating-block-wrapper'>
              <div className='rating-block'>Ваша оценка
                <div data-test-id='rating' className='rate-container'>
                  <Rate maxRate={5} selectedRate={rate} updRate={setRate}/>
                </div>
              </div>
              <label htmlFor='comment'>
                <textarea data-test-id='comment'
                  type="text" 
                  value={comment} 
                  onChange={(event) => setComment(event.target.value)}
                  className='textarea' id='comment' name="textarea"
                  placeholder='Оставить отзыв'/>
              </label>
              <button data-test-id='button-comment' onClick={()=>onSubmit(ratingData)} className='rating-block-btn'>оценить книгу</button>
            </div>
          </RatingModal>
        </section>
)};


