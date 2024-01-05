/* eslint-disable */

import { useDispatch, useSelector } from 'react-redux';

import { NavLink } from 'react-router-dom';
import avatar from '../../imgs/avatar.png';
import { logOut } from '../../features/auth/auth-slice';

import './personal-input.scss';
import { selectMeData } from '../../features/me/me-slice';

export const PersonalInput = () => {
  const dispatch = useDispatch();
  const meData = useSelector(selectMeData);


  const handleLogOut = () => {
    dispatch(logOut());
    localStorage.clear();
  }
  
  return (
    <div className='personal-input-container'>
      <div className='personal-input-info'>
        <span className='personal-input-greetings'>Привет, {meData?.firstName ? meData?.firstName : 'Иван'}!</span>
        <span style={{ color: '#727272', fontSize: '12px'}}> Договор 123456789</span>
      </div>
      <div className='img-container'>
        <img className='avatar' src={meData?.avatar !== null ? meData?.avatar : avatar} alt='avatar'/>
      </div>
      <ul className={'profile-menu-container'}>
        <li><NavLink className='personal-profile' to='/profile'>Профиль</NavLink></li>
        <li onClick={handleLogOut}>Выход</li>
      </ul>
    </div>
    
)};