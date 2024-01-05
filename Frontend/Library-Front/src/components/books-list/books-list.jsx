/* eslint-disable */

import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import 'moment/locale/ru';

import { selectIsAuth} from '../../features/auth/auth-slice';
import { loadBooks, selectVisibleBooks, selectBooksInfo } from '../../features/books/books-slice';
import { selectCategoriesInfo } from '../../features/categories/categories-slice';
import { selectControls, selectField, selectSort } from '../../features/controls/controls-slice';
import { BookCard } from '../book-card/book-card';
import { Navigation } from '../navigation/navigation';
import { Modal } from '../modal/modal';
import { Calendar } from '../calendar/calendar';


import './books-list.scss';
import { selectBookingData, selectBookingInfo } from '../../features/booking/booking-slice';
import { selectRebookingData } from '../../features/rebooking/rebooking-slice';
import { selectDeleteBookingData } from '../../features/delete-booking/delete-booking-slice';
import { loadMe, selectMeData } from '../../features/me/me-slice';

export const BooksList = () => {
  const dispatch = useDispatch();
  moment.locale('ru');

  const {search, category, path, sort, field} = useSelector(selectControls);
  const books = useSelector(state => selectVisibleBooks (state, {search, category})).sort(sorting(sort,field));
  const booksInCategory = useSelector(state => selectVisibleBooks (state, {category}));
  const {status, qty} = useSelector(selectBooksInfo);
  const meData = useSelector(selectMeData);
  const {statusCat} = useSelector(selectCategoriesInfo);
  const [choosenView, setChoosenView] = useState(0);
  const [bookId, setbookId] = useState();
  const [customerId, setCustomerId] = useState();
  const [dateOrder, setDateOrder] = useState();
  const [bookingID, setBookingId] = useState();
  const bookingData = useSelector(selectBookingData);
  const rebookingData = useSelector(selectRebookingData);
  const deleteBookingData = useSelector(selectDeleteBookingData);
  const [bigModal, setBigModal] = useState(false);
  const isAuth = useSelector(selectIsAuth);
  const [isModalActive, setModalActive] = useState(false);
  const [value, setValue] = useState(moment());

  useEffect(() => {
    if (isAuth) {
    dispatch(loadMe());
    dispatch(loadBooks());
  };
  }, [isAuth, bookingData, rebookingData, deleteBookingData, dispatch]);

  function sorting (sorted, value) {
    if (sorted === 'desc') {
      return (a, b) => (a[value] > b[value] ? -1 : 1)
    };
    return (a, b) => (a[value] > b[value] ? 1 : -1);
  }

  const handleChangeView = (btnId) => {
    setChoosenView(btnId);
  }

  const handleGetBookId = (id) => {
    setbookId(id)
  }
  const handleDateOrder = (dateOrder) => {
    setDateOrder(dateOrder)
  }

  const handleCustomerId = (customerId) => {
    setCustomerId(customerId)
  }

  const handleBookigId = (bookingId) => {
    setBookingId(bookingId)
  }

  const handleBigModal = (bool) => {
    setBigModal (bool)
  }

  const title='Выбор даты бронирования';
  const title2='Изменение даты бронирования';

  return (
      <section className='booklist-container'> 
      {status === 'recieved' && statusCat === 'recieved' ?  
        <React.Fragment>
          <Navigation onChangeView={ handleChangeView }/>
          <section className={!booksInCategory.length || !books.length ? 'nothing-found' : choosenView === 1 ? 'books-list-list' : 'books-list'} data-test-id='content'>
            {
            !booksInCategory.length ? <p className='empty' data-test-id='empty-category'>В этой категории книг ещё нет</p> :
            books.length ? (
              books.map((book) => <BookCard 
                  key={book.id} 
                  customerId={book.booking?.customerId}
                  delivery={book.delivery}
                  dateHandedTo={book.delivery?.dateHandedTo}
                  dateOrder={book.booking?.dateOrder}
                  bookingId={book.booking?.id}
                  {...book}
                  path={path}
                  category={category}
                  choosenView={choosenView}
                  setModalActive={setModalActive}
                  getBookId={handleGetBookId}
                  getCustomerId={handleCustomerId}
                  getDateOrder={handleDateOrder}
                  getBookingId={handleBookigId}
                  onBigModal={handleBigModal}
                  />)
                ) : (
                  <p className='empty' data-test-id='search-result-not-found'>По запросу ничего не найдено</p>
                )
            }
          </section>
        </React.Fragment> : 
        null
      }
        <Modal isModalActive={isModalActive} setModalActive={setModalActive} title={bigModal ? title2 : title} bigModal={bigModal}>
          <Calendar value={value} onChange={setValue} bookId={bookId} customerId={customerId} dateOrder={dateOrder} bookingID={bookingID} setModalActive={setModalActive}/>
        </Modal>      
      </section>
    )
};

