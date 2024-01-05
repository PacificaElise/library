/* eslint-disable */

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import warning from '../../imgs/icons/warningCircle.svg';
import success from '../../imgs/icons/success.svg';

import './alerts-toast.scss';
import { setRebookingAlertToast } from '../../features/toggle-alert-toast/toggle-alert-rebooking-toast-slice';
import { selectRebookingInfo } from '../../features/rebooking/rebooking-slice';

export const RebookingAlertToast = () => {
  const dispatch = useDispatch();
  const switchOfAlertRebookingToast = () => dispatch(setRebookingAlertToast(false))
  const alertRebookingToast = useSelector(state => state.alertRebookingToast);
  const {statusRebooking} = useSelector(selectRebookingInfo);

  useEffect(()=> {
    setTimeout(()=>{
      switchOfAlertRebookingToast()
    }, '4000')
  }, [statusRebooking])

  return (
    alertRebookingToast === false ? null :
    <div className='alert-container'>
      <div data-test-id='error' className={statusRebooking === 'recieved' ? 'alert-toast-succ' : 'alert-toast-err'}>
        <div className={'image-container'}>
          {statusRebooking === 'recieved' ? <img src={success} alt='success'/>: <img src={warning} alt='warning'/>}
        </div>
        {statusRebooking === 'recieved' ? <p>Изменения успешно сохранены!</p> : <p>Изменения не были сохранены. Попробуйте позже!'</p>}
        <button className='close' type='button' aria-label='close' data-test-id='alert-close' onClick={() => {switchOfAlertRebookingToast()}}/>   
      </div> 
    </div> 
  )};