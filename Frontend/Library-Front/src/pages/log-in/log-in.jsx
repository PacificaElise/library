/* eslint-disable */

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Navigate } from 'react-router-dom';
import { loadUserData, selectIsAuth, selectUserInfo, dropError, selectIsAuthState } from '../../features/auth/auth-slice';
import {ReactComponent as ClosedEye} from '../../imgs/icons/closed-eye.svg';
import {ReactComponent as OpenedEye} from '../../imgs/icons/opened-eye.svg';

import './log-in.scss';

export const LogIn = () => { 
  const dispatch = useDispatch();
  const {errorAuth, statusAuth} = useSelector(selectUserInfo);
  const isAuthState = useSelector(selectIsAuthState);
  const [toggleIcon, setToggleIcon] = useState(<ClosedEye/>);
  const [type, setType] = useState('password');
  const [eye, setEye] = useState(false);
  const [errIdenty, setErrIdenty] = useState(false);
  const [emptyIdenty, setEmptyIdenty] = useState('');
  const [errPassw, setErrPassw] = useState(false);
  const [emptyPassw, setEmptyPassw] = useState('');

  const { register, formState: { isValid}, handleSubmit } = useForm({
    mode: 'all'
    }
  );
  
  const onSubmit = async (values) => {
    localStorage.clear();
    const userData = await dispatch(loadUserData(values));
    if(userData.payload !== undefined) {   
      localStorage.setItem('token', userData.payload.data.jwt);
      localStorage.setItem('user', JSON.stringify(userData.payload.data.user));
      // document.cookie = `token=${userData.payload.data.jwt}`;
     // document.cookie = `user=${JSON.stringify(userData.payload.data.user)}`
    }  
  }

  if (isAuthState) {
    return <Navigate to='/books/all'/>
  }
  

  const removeError = () => {
    dispatch(dropError());
  }

  const togglePassInput = () => {
    if (type === 'password') {
      setType('text');
      setToggleIcon(<OpenedEye/>);
    } else {
      setType('password');
      setToggleIcon(<ClosedEye/>);
    }
  }

  return (
    <div className='loader-wrapper' data-test-id='auth'>
    {statusAuth === 'loading' ?
        <div data-test-id='loader' className='loader'>
          <svg width="70" height="68" viewBox="0 0 70 68" fill="none">
            <path d="M63.9884 33C66.9634 33 69.4181 35.4262 68.9538 38.3646C68.2262 42.9697 66.5662 47.3979 64.0547 51.3702C60.5793 56.867 55.6158 61.2652 49.7407 64.054C43.8656 66.8428 37.32 67.9078 30.8638 67.1253C24.4077 66.3427 18.306 63.7448 13.2673 59.6332C8.22853 55.5216 4.45953 50.065 2.39793 43.897C0.336322 37.7291 0.0667017 31.1028 1.62037 24.7877C3.17405 18.4727 6.48727 12.7279 11.1753 8.2205C14.5631 4.96325 18.5684 2.44877 22.9339 0.812264C25.7195 -0.231984 28.5887 1.68624 29.1854 4.60069C29.7822 7.51514 27.8611 10.3078 25.1572 11.5485C22.7634 12.6468 20.5587 14.1435 18.6419 15.9864C15.4231 19.0812 13.1483 23.0255 12.0815 27.3615C11.0148 31.6974 11.1999 36.247 12.6154 40.4819C14.0309 44.7168 16.6187 48.4633 20.0783 51.2864C23.5379 54.1094 27.7273 55.8931 32.1601 56.4304C36.5929 56.9677 41.0871 56.2365 45.121 54.3217C49.1548 52.4069 52.5627 49.3871 54.949 45.613C56.37 43.3655 57.394 40.9054 57.9899 38.34C58.663 35.4422 61.0135 33 63.9884 33Z" fill="url(#paint0_linear_18296_2627)">
              <animateTransform 
                attributeName="transform"
                type="rotate"
                from="0 35 35"
                to="360 35 35"
                dur="0.8s"
                repeatCount="indefinite"/>
            </path>
            <defs>
              <linearGradient id="paint0_linear_18296_2627" x1="33.7618" y1="-129.207" x2="-231.946" y2="81.5261" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F83600"/>
              <stop offset="1" stopColor="#F9D423"/>
              </linearGradient>
            </defs>
          </svg>
        </div> :
        null
      }
      <div className={statusAuth === 'loading' ? 'login-wrapper blur' : 'login-wrapper'}>
        {errorAuth && !errorAuth.includes('400') ? 
          <div className='login'>
            <h1 className='company-title'>Cleverland</h1>
            <div className='login-form-err' data-test-id='status-block'>
              <div className='login-block'>
                <h2 className='login-title'>Вход не выполнен</h2>
              </div>
              <div className='login-inputs'>
                <p className='login-again'>Что-то пошло не так. Попробуйте ещё раз.</p>
              </div>           
              <button className='login-btn-again' type='button'><NavLink to='/auth' onClick={removeError}>повторить</NavLink></button>
            </div>
          </div>
          : 
          <div className='login'>
            <h1 className='company-title'>Cleverland</h1>
            <form className='login-form' onSubmit={handleSubmit(onSubmit)} data-test-id='auth-form'>
              <div className='login-block'>
                <h2 className='login-title'>Bход в личный кабинет</h2>
              </div>
              <div className='login-inputs'>
                <div className='login-container'>
                  <input className={((errIdenty===true && emptyIdenty === '') || errorAuth?.includes('400')) ? 'login-input-warn' : 'login-input'} id='identifier' type='text' required='required' {...register('identifier', {required: 'Поле не может быть пустым'})} onBlur={(e)=>{setErrIdenty(true); setEmptyIdenty(e.target.value)}} onFocus={()=>setErrIdenty(false)}/>
                  <label htmlFor='identifier' className='login-label'>Логин</label> 
                  {(errIdenty===true && emptyIdenty === '') ?
                    <span className='error' data-test-id='hint'>Поле не может быть пустым</span> : 
                      null
                    }                
                </div>                
                <div className='login-container'>
                  <input className={((errIdenty===true && emptyIdenty === '') || errorAuth?.includes('400')) ? 'login-input-warn' : 'login-input'} id='password' type={type} required='required' 
                  {...register('password', {required: 'Поле не может быть пустым'})}
                  onBlur={(e)=>{setErrPassw(true); setEmptyPassw(e.target.value)}} onFocus={()=>{setErrPassw(false); setEye(true)}}/>
                  <label htmlFor='password' className='login-label'>Пароль</label>
                  {eye ? <button type='button' className='eye-icon' data-test-id={type === 'password' ? 'eye-closed' : 'eye-opened'} onClick={togglePassInput}>{toggleIcon}</button> : null}
                  {(errPassw===true && emptyPassw === '') ?
                    <span className='error' data-test-id='hint'>Поле не может быть пустым</span> : 
                      null
                    }                   
                    {errorAuth?.includes('400') ?
                    <div className='login-error-message'>
                      <span className='restore-password warn' data-test-id='hint'>Неверный логин или пароль!</span>
                      <NavLink to='/forgot-pass' className='restore-password'>Восстановить?</NavLink>
                    </div> :
                    <NavLink className='forgot-password' to='/forgot-pass'>Забыли логин или пароль?</NavLink>
                    }
                </div>   
              </div>           
              <button disabled={!isValid} className='login-btn' type='submit'>вход</button>
              <p className='login-enter'>Нет учётной записи?
                <NavLink to='/registration' className='login-reg'>регистрация</NavLink>
              </p>
            </form>
          </div>
        }
      </div>
    </div>
    )
};