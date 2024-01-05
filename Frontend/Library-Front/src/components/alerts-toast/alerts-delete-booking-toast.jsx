/* eslint-disable */

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import warning from '../../imgs/icons/warningCircle.svg';
import success from '../../imgs/icons/success.svg';

import './alerts-toast.scss';
import { setAlertDeleteBookingToast } from '../../features/toggle-alert-toast/toggle-alert-delete-booking-toast-slice';
import { selectDeleteBookingInfo } from '../../features/delete-booking/delete-booking-slice';

export const DeleteBookingAlertToast = () => {
  const dispatch = useDispatch();
  const switchOfDeleteBookingAlertToast = () => dispatch(setAlertDeleteBookingToast(false))
  const alertDeleteBookingToast = useSelector(state => state.alertDeleteBookingToast);
  const {statusDeleteBooking} = useSelector(selectDeleteBookingInfo);

  useEffect(()=> {
    setTimeout(()=>{
      switchOfDeleteBookingAlertToast()
    }, '4000')
  }, [statusDeleteBooking])

  return (
    alertDeleteBookingToast === false ? null :
    <div className='alert-container'>
      <div data-test-id='error' className={statusDeleteBooking === 'received' ? 'alert-toast-succ' : 'alert-toast-err'}>
        <div className={'image-container'}>
          {statusDeleteBooking === 'received' ? <img src={success} alt='success'/>: <img src={warning} alt='warning'/>}
        </div>
        {statusDeleteBooking === 'received' ? <p>Бронирование книги успешно отменено!</p> : <p>Не удалось отменить бронирование книги. Попробуйте позже!</p>}
        <button className='close' type='button' aria-label='close' data-test-id='alert-close' onClick={() => {switchOfDeleteBookingAlertToast()}}/>   
      </div> 
    </div>
  )};