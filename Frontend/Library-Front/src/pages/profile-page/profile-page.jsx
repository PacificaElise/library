import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import 'moment/locale/ru';
import { BookCard } from '../../components/book-card/book-card';
import { loadMe, selectMeData } from '../../features/me/me-slice';
import { Modal } from '../../components/modal/modal';
import { Calendar } from '../../components/calendar/calendar';
import avatar from '../../imgs/avatar.png';

import './profile-page.scss';
import { selectBookingData } from '../../features/booking/booking-slice';
import { selectRebookingData } from '../../features/rebooking/rebooking-slice';
import { selectDeleteBookingData } from '../../features/delete-booking/delete-booking-slice';

export const ProfilePage = () =>  {
  const dispatch = useDispatch();

  const meData = useSelector(selectMeData);
  moment.locale('ru');

  const bookingData = useSelector(selectBookingData);
  const rebookingData = useSelector(selectRebookingData);
  const deleteBookingData = useSelector(selectDeleteBookingData);

  const [login, setValueLogin] = useState(meData?.username);
  const [firstName, setValuefirstName] = useState(meData?.firstName);
  const [phone, setValuePhone] = useState(meData?.phone);
  const [password, setValuePassword] = useState(meData?.password);
  const [lastName, setValuelastName] = useState(meData?.lastName);
  const [mail, setValueEmail] = useState(meData?.email);
  const [isModalActive, setModalActive] = useState(false);
  const [bookId, setbookId] = useState();
  const [customerId, setCustomerId] = useState();
  const [dateOrder, setDateOrder] = useState();
  const [bookingID, setBookingId] = useState();
  const [bigModal, setBigModal] = useState(false);
  const [value, setValue] = useState(moment());
  const overdue = new Date() > new Date(meData.booking.dateOrder);

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

useEffect(() => { 
  dispatch(loadMe());
}, [bookingData, rebookingData, deleteBookingData, dispatch]);
console.log(meData)

return (
  <div className='profile'>
    <div className='name-user'>
      <div className='name-user-img-container'>
          <img className='ava' src={meData?.avatar !== null ? meData?.avatar : avatar} alt='ava'/>
      </div>
      <div className='user-name'>
        <span>{meData?.firstName !== null ? meData?.firstName : 'Иван'}</span>
        <span>{meData?.lastName !== null ? meData?.lastName : 'Иванов'}</span>
      </div>
    </div>
    <form className='profile-form'>
      <div className='profile-form-header'>
        <h3 className='profile-form-header-title'>Учётные данные</h3>
        <span>Здесь вы можете отредактировать информацию о себе</span>
      </div>
      <div className='profile-form-text-fields'>
        <div className='profile-form-text-field'>
          <div className='profile-form-input-container'>
            <input className='profile-form-input' id='login' type='text' required='required'
              value={login} onChange={(event) => setValueLogin(event.target.value)}/>
            <label htmlFor='login' className='label'>Логин</label>
          </div>
          <div className='profile-form-input-container'>
            <input className='profile-form-input' id='firstName' type='text' required='required'
              value={firstName} onChange={(event) => setValuefirstName(event.target.value)}/>
            <label htmlFor='firstName' className='label'>Имя</label>
          </div>
          <div className='profile-form-input-container'>
            <input className='profile-form-input' id='phone' type='text' required='required'
              value={phone} onChange={(event) => setValuePhone(event.target.value)}/>
            <label htmlFor='phone' className='label'>Номер телефона</label>
          </div>
        </div>
        <div className='profile-form-text-field'>
          <div className='profile-form-input-container'>
            <input className='profile-form-input' id='password' type='text' required='required'
              value={password} onChange={(event) => setValuePassword(event.target.value)}/>
            <label htmlFor='password' className='label'>Пароль</label>
          </div>
          <div className='profile-form-input-container'>
            <input className='profile-form-input' id='lastName' type='text' required='required'
              value={lastName} onChange={(event) => setValuelastName(event.target.value)}/>
            <label htmlFor='lastName' className='label'>Фамилия</label>
          </div>
          <div className='profile-form-input-container'>
            <input className='profile-form-input' id='mail' type='text' required='required'
              value={mail} onChange={(event) => setValueEmail(event.target.value)}/>
            <label htmlFor='mail' className='label'>E-mail</label>
          </div>
        </div>
      </div>
      <div className='profile-form-btns'>
        <button type='submit'>редактировать</button>
        <button type='submit'>сохранить изменения</button>
      </div>
    </form>
    
    <div className='profile-block'>
    <div className='profile-form-header'>
      <h3 className='profile-form-header-title'>Забронированная книга</h3>
      <span>Здесь вы можете просмотреть забронированную книгу, а так же отменить бронь</span>
    </div>
    {meData.booking?.order === true ? 
      <div className={overdue === true ? 'profile-block-card-container' : ''}>
        {overdue === true && <h2 className='profile-block-card-container-booking-title'>Дата бронирования книги истекла</h2>}
        {overdue === true && <span className='profile-block-card-container-booking-warn'>Через 24 часа книга будет доступна всем</span>}
        <BookCard
          id={meData.booking.book?.id} 
          title={meData.booking.book?.title} 
          authors={meData.booking.book?.authors}
          issueYear={meData.booking.book?.issueYear}
          rating={meData.booking.book?.rating}
          image={new Array(meData.booking.book.image)}
          customerId={meData.id}
          delivery={meData.delivery.handed}
          booking={meData.booking.order}
          bookingId={meData.booking?.id}
          dateHandedTo={meData.delivery.dateHandedTo}
          setModalActive={setModalActive}
          getBookId={handleGetBookId}
          getCustomerId={handleCustomerId}
          getDateOrder={handleDateOrder}
          getBookingId={handleBookigId}
          onBigModal={handleBigModal}
          choosenView={1}
          overdue={overdue}/>
      </div> :
      <div className='profile-block-card'>
        <p>Забронируйте книгу и она отобразится</p>
      </div>}
    </div>
    <div className='profile-block'>
      <div className='profile-form-header'>
        <h3 className='profile-form-header-title'>Книга которую взяли</h3>
        <span>Здесь можете просмотреть информацию о книге и узнать сроки возврата</span>
      </div>
      <div className='profile-block-card'>
        <p>Прочитав книгу, она отобразится в истории</p>
      </div>
    </div>
    <div className='profile-block'>
      <div className='profile-form-header'>
        <h3 className='profile-form-header-title'>История</h3>
        <span>Список прочитанных книг</span>
      </div>
      <div className='profile-block-card'>
        <p>Вы не читали книг из нашей библиотеки</p>
      </div>
    </div>
      
    <Modal isModalActive={isModalActive} setModalActive={setModalActive} title='Изменение даты бронирования' bigModal={true}>
      <Calendar value={value} onChange={setValue} bookId={meData.booking.book?.id} customerId={meData.id} dateOrder={meData.booking?.dateOrder} bookingID={meData.booking?.id} setModalActive={setModalActive}/>
    </Modal>  
  </div>)
};