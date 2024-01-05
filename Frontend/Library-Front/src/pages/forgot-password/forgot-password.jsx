/* eslint-disable */

import {useState} from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Navigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { selectIsAuth } from '../../features/auth/auth-slice';
import {ForgotpassSchema} from '../../validation/forgot-pass-schema';

import {ReactComponent as EnterArrow} from '../../imgs/icons/enter-arrow.svg';
import './forgot-password.scss';
import { fetchGetPassword, selectForgotPassInfo } from '../../features/forgot-password/forgot-password-slice';

export const ForgotPassword = () => { 
  
  const dispatch = useDispatch();
  const {errorForgotPass, statusForgotPass} = useSelector(selectForgotPassInfo);
  const isAuth = useSelector(selectIsAuth);
  const [errEmail, setErrEmail] = useState(false);
  const [emptyEmail, setEmptyEmail] = useState('');

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'all',
    criteriaMode: "all",
    resolver: yupResolver(ForgotpassSchema),
  }
  );

  if (isAuth) {
    return <Navigate to='/books/all'/>
  }

  const onSubmit = (values) => { 
    dispatch(fetchGetPassword(values));
    reset();
  }

  return (
    <div className='loader-wrapper' data-test-id='auth'>
      {statusForgotPass === 'loading' ?
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
      <div className={statusForgotPass === 'loading' ? 'reg-wrapper blur' : 'reg-wrapper'}>
      {statusForgotPass === 'recieved' ? 
        <div className='forgotpass'>
        <h1 className='company-title'>Cleverland</h1>
        <div className='forgotpass-form-suc' data-test-id='status-block'>
          <div className='forgotpass-block'>
            <h2 className='forgotpass-title'>Письмо выслано</h2>
          </div>
          <div className='forgotpass-inputs'>
            <p className='forgotpass-again'>Перейдите в вашу почту, чтобы воспользоваться подсказками по восстановлению пароля</p>
          </div>           
        </div>
        </div>
        : 
        <div className='forgotpass'>
          <h1 className='company-title'>Cleverland</h1>
          <form className='forgotpass-form' onSubmit={handleSubmit(onSubmit)} data-test-id='send-email-form'>
            <div className='forgotpass-profile'><NavLink to='/profile'><EnterArrow/>вход в личный кабинет</NavLink></div>
            <div className='forgotpass-block'>
              <h2 className='forgotpass-title'>Восстановление пароля</h2>
            </div>
            <div className='forgotpass-inputs'>  
              <div htmlFor='email' className='forgotpass-container'> 
                <input className={((errEmail===true && emptyEmail === '') || errorForgotPass) ? 'forgotpass-input-warn' : 'forgotpass-input'} id='email' type='text' required='required' 
                {...register('email')} onBlur={(e)=>{setErrEmail(true); setEmptyEmail(e.target.value)}} onFocus={()=>setErrEmail(false)}/>
                <label htmlFor='email' className='forgotpass-label'>Email</label>
                {errorForgotPass ? <span data-test-id='hint' className='error'>error</span> : (errEmail===true && emptyEmail === '') ? <span data-test-id='hint' className='error'>Поле не может быть пустым</span> :
                errors.email?.message &&
                <span data-test-id='hint' className='error'>{errors.email?.message}</span>}
                <span>На это email будет отправлено письмо с инструкциями по восстановлению пароля</span>
              </div>   
            </div>           
            <button className='forgotpass-btn' type='submit'>восстановить</button>
            <p className='forgotpass-enter'>Нет учётной записи?
              <NavLink to='/registration' className='forgotpass-reg'>регистрация<EnterArrow className='rotate'/></NavLink>
            </p>
          </form>
        </div>
      }
      </div>
    </div>
  )
};
