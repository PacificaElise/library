/* eslint-disable */

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import warning from '../../imgs/icons/warningCircle.svg';
import success from '../../imgs/icons/success.svg';

import './alerts-toast.scss';
import { selectBookingInfo } from '../../features/booking/booking-slice';
import { setAlertBookingToast } from '../../features/toggle-alert-toast/toggle-alert-booking-toast-slice';

export const BookingAlertToast = () => {
  const dispatch = useDispatch();
  const switchOfAlertBookingToast = () => dispatch(setAlertBookingToast(false))
  const alertBookingToast = useSelector(state => state.alertBookingToast);
  const {statusBooking} = useSelector(selectBookingInfo);

  useEffect(()=> {
    setTimeout(()=>{
      switchOfAlertBookingToast()
    }, '4000')
  }, [statusBooking])

  return (
    alertBookingToast === false ? null :
    <div className='alert-container'>
      <div data-test-id='error' className={statusBooking === 'recieved' ? 'alert-toast-succ' : 'alert-toast-err'}>
        <div className={'image-container'}>
          {statusBooking === 'recieved' ? <img src={success} alt='success'/>: <img src={warning} alt='warning'/>}
        </div>
        {statusBooking === 'recieved' ? <p>Книга забронирована. Подробности можно посмотреть на странице Профиль</p> : <p>Что-то пошло не так, книга не забронирована. Попробуйте позже!</p>}
        <button className='close' type='button' aria-label='close' data-test-id='alert-close' onClick={() => {switchOfAlertBookingToast()}}/>   
      </div> 
    </div> 
  )};