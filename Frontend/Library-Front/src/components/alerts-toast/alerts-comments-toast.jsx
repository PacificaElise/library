/* eslint-disable */

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import warning from '../../imgs/icons/warningCircle.svg';
import success from '../../imgs/icons/success.svg';

import './alerts-toast.scss';
import { selectRatingInfo } from '../../features/rating/rating-slice';
import { setAlertCommentsToast } from '../../features/toggle-alert-toast/toggle-alert-comments-slice';

export const CommentsAlertToast = () => {
  const dispatch = useDispatch();
  const switchOfAlertCommentsToast = () => dispatch(setAlertCommentsToast(false))
  const alertCommentsToast = useSelector(state => state.alertCommentsToast);
  const { statusRate } = useSelector(selectRatingInfo);

  useEffect(()=> {
    setTimeout(()=>{
      switchOfAlertCommentsToast()
    }, '4000')
  }, [statusRate])

  return (
    alertCommentsToast === false ? null :
    <div className='alert-container'>
      <div data-test-id='error' className={statusRate === 'recieved' ? 'alert-toast-succ' : 'alert-toast-err'}>
        <div className={'image-container'}>
          {statusRate === 'recieved' ? <img src={success} alt='success'/>: <img src={warning} alt='warning'/>}
        </div>
        {statusRate === 'recieved' ? <p>Спасибо, что нашли время оценить книгу!</p> : <p>Оценка не была отправлена. Попробуйте позже!</p>}
        <button className='close' type='button' aria-label='close' data-test-id='alert-close' onClick={() => {switchOfAlertCommentsToast()}}/>   
      </div> 
    </div> 
  )};