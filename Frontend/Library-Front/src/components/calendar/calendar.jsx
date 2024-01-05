/* eslint-disable */

import { useState, useEffect } from 'react';
import { buildCalendar } from './build';
import moment from 'moment';
import 'moment/locale/ru';

import './calendar.scss';
import { ReactComponent as PrevMonth } from '../../imgs/icons/prevMonth.svg';
import { ReactComponent as NextMonth } from '../../imgs/icons/nextMonth.svg';
import { useDispatch, useSelector } from 'react-redux';
import { loadBookingData } from '../../features/booking/booking-slice';
import {setAlertBookingToast  } from '../../features/toggle-alert-toast/toggle-alert-booking-toast-slice';
import { setAlertDeleteBookingToast } from '../../features/toggle-alert-toast/toggle-alert-delete-booking-toast-slice';
import { setRebookingAlertToast } from '../../features/toggle-alert-toast/toggle-alert-rebooking-toast-slice';
import { loadRebookingData } from '../../features/rebooking/rebooking-slice';
import { deleteBookingById } from '../../features/delete-booking/delete-booking-slice';
import { selectMeData } from '../../features/me/me-slice';

export const Calendar = ({ dateOrder, value = dateOrder, onChange, bookId, customerId, setModalActive, bookingID, bigModal }) => {
  const dispatch = useDispatch();
  const switchOnAlertBookingToast = () => dispatch(setAlertBookingToast(true));
  const switchOnAlertRebookingToast = () => dispatch(setRebookingAlertToast(true));
  const switchOnAlertDeleteBookingToast = () => dispatch(setAlertDeleteBookingToast(true));
  const meData = useSelector(selectMeData);
  
  const [calendar, setCalendar] = useState([]);
  const [selected, setSelected] = useState(false);

  useEffect(()=>{
    setCalendar(buildCalendar(value))
  }, [value])

  const isSelectedDay = (day) =>{
    return value.isSame(day, 'day')
  }

const beforeToday = (day) => {
  return day.isBefore(new Date(), 'day')
}

const isWeekend = () => {
  if (new Date().getDay() === 5) return 3
  if (new Date().getDay() === 6) return 2
  if (new Date().getDay() === 0) return 1
  return 1
}
const tomorrow = new Date(new Date().setDate(new Date().getDate() + isWeekend()));

const afterToday = (day) => {
  return day.isAfter(tomorrow, 'day')
}

const isToday = (day) => {
  return day.isSame(new Date(), 'day')
}

const dayStyles = (day) => {
  if (beforeToday(day) || afterToday(day) || ((day._d.toString().includes('Sat') ||
  day._d.toString().includes('Sun')) && !isToday(day))) return 'inactive'
}

const currMonth = () => {
  return value.format('MMMM')
}

const currYear = () => {
  return value.format('YYYY')
}

const prevMonth = () => {
  return value.clone().subtract(1, 'month')
}

//если для месяцев селект билдить начало календаря с того месяца, который выбран в селекте)

const nextMonth = () => {
  return value.clone().add(1, 'month')
}

const arOptions = moment.months();
const [valueMonth, setValueMonth] = useState(currMonth());

const options = arOptions.map((text) => {
  return <option key={text} value={text}>{text} {currYear()}</option>;
});

const newBookingData = { data: {
  order: true,
  dateOrder: value,
  book: bookId,
  customer: meData.id
}}

const reBookingData = { data: {
  order: true,
  dateOrder: value,
  book: bookId,
  customer: meData.id
},
  bookingID
}


const onSubmit = async (data) => {
  await dispatch(loadBookingData(data));
  setSelected(false);
  switchOnAlertBookingToast();
}

const rebook = async ({bookingID, data}) => {
  await dispatch(loadRebookingData({bookingID, data}));
  setSelected(false);
  switchOnAlertRebookingToast();

}

const deleteBooking = async (id) => {
  await dispatch(deleteBookingById(id));
  setSelected(false);
  switchOnAlertDeleteBookingToast();
}

    return (
      <div className='calendar-wrapper'>
        <div data-test-id='calendar' className='calendar'>
          <div className='calendar-header'>
          <select data-test-id='month-select' className='month-select' value={valueMonth} onChange={(event) => setValueMonth(event.target.value)}>
            {options}
          </select>
          <div className='calendar-btns'>
            {<button data-test-id='button-prev-month'><PrevMonth onClick={() => {onChange(prevMonth()); setValueMonth(prevMonth().format('MMMM'))}}/></button>}
            <button data-test-id='button-next-month'><NextMonth onClick={() => {onChange(nextMonth()); setValueMonth(nextMonth().format('MMMM'))}}/></button>
          </div> 
          </div>
          <div className='calendar-datas'>
            <div className='day-names'>
              {
                ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((d) => (
                <div key={d} className='week'>{d}</div>
                ))
              }
            </div>
            {calendar.map((week) => (
              <div key={week}>
                {week.map((day) => (
                  <button type='submit' className='day' key={day}
                    disabled={beforeToday(day) || afterToday(day) || day._d.toString().includes('Sat') || day._d.toString().includes('Sun') ? true : false}
                    onClick={()=>{onChange(day); setSelected(true)}} 
                  >
                    <div data-test-id='day-button' className={
                      (isSelectedDay(day) && selected) && 
                      (((!day._d.toString().includes('Sat') || !day._d.toString().includes('Sun')))) || 
                      (Date.parse(day._d) === Date.parse(dateOrder) && 
                      (customerId === meData?.id) && !selected) ?'selected' : 
                      
                      dayStyles(day) + ' ' + 
                    ((day._d.toString().includes('Sat') || day._d.toString().includes('Sun')) ? 'weekend' : '') + ' ' + 
                    (isToday(day) ? 'today' : '')}>
                    {day.format('D').toString()}</div>
                    </button>
                  ))}
              </div>
              ))}
            </div>
          </div>
          <button data-test-id='booking-button' className='booking-modal-btn'type='onSubmit' disabled={
            (!selected  || (selected && Date.parse(value._d) === Date.parse(dateOrder))) ? 
            true : false} 
            onClick={() => {
            ((customerId === meData?.id) ? rebook(reBookingData) : onSubmit(newBookingData)); 
            setModalActive(false);
            }}>
              забронировать
          </button>
          {(customerId === meData?.id) || bigModal ? <button data-test-id='booking-cancel-button' className='booking-cancel' onClick={() => {deleteBooking(bookingID); setModalActive(false)}}>отменить бронь</button> : null}
      </div>)
    }
