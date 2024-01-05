/* eslint-disable */

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useSearchParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { fetchResetPassword, selectResetPassInfo } from '../../features/reset-password/reset-password-slice';
import {ReactComponent as ClosedEye} from '../../imgs/icons/closed-eye.svg';
import {ReactComponent as OpenedEye} from '../../imgs/icons/opened-eye.svg';
import {ReactComponent as Check} from '../../imgs/icons/check.svg';
import { ResetPassSchema } from '../../validation/reset-pass-schema';

import './reset-password.scss';

export const ResetPassword = () => { 
  const dispatch = useDispatch();
  const {errorResetPass, statusResetPass} = useSelector(selectResetPassInfo);
  const [toggleIcon, setToggleIcon] = useState(<ClosedEye/>);
  const [type, setType] = useState('password');
  const [toggleIconConfirm, setToggleIconConfirm] = useState(<ClosedEye/>);
  const [typeConfirm, setTypeConfirm] = useState('password');
  const [eye, setEye] = useState(false);
  const [eyeConfirm, setEyeConfirm] = useState(false);
  const [errPass, setErrPass] = useState(false);
  const [errPassConfirm, setErrPassConfirm] = useState(false);
  const [emptyPass, setEmptyPass] = useState('');
  const [emptyPassConfirm, setEmptyPassConfirm] = useState('');
  
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');

  const { register, reset, getFieldState, formState: {errors}, handleSubmit } = useForm({
    mode: 'all',
    criteriaMode: "all",
    resolver: yupResolver(ResetPassSchema),
  }
  );

  const onSubmit = (values) => {
    values.code = code;
    dispatch(fetchResetPassword(values));
    reset();
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

  const togglePassConfirmInput = () => {
    if (typeConfirm === 'password') {
      setTypeConfirm('text');
      setToggleIconConfirm(<OpenedEye/>);
    } else {
      setTypeConfirm('password');
      setToggleIconConfirm(<ClosedEye/>);
    }
  }

  return (
    <div className='loader-wrapper' data-test-id='auth'>
    {statusResetPass === 'loading' ?
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
    <div className={statusResetPass === 'loading' ? 'reset-pass-wrapper blur' : 'reset-pass-wrapper'}>
      {statusResetPass === 'recieved' ? 
        <div className='reset-pass'>
        <h1 className='company-title'>Cleverland</h1>
        <div className='reset-pass-form-suc' data-test-id='status-block'>
          <div className='reset-pass-block'>
            <h2 className='reset-pass-title'>Новые данные сохранены</h2>
          </div>
          <div className='reset-pass-inputs'>
            <p className='reset-pass-again'>Зайдите в личный кабинет, используя свои логин и новый пароль</p>
          </div>
          <button className='reset-pass-btn-again' type='button'><NavLink to='/auth'>вход</NavLink></button>           
        </div>
        </div>
        : 
        (errorResetPass) ?
        <div className='reset-pass'>
        <h1 className='company-title'>Cleverland</h1>
        <div className='reset-pass-form-suc' data-test-id='status-block'>
          <div className='reset-pass-block'>
            <h2 className='reset-pass-title'>Данные не сохранились</h2>
          </div>
          <div className='reset-pass-inputs'>
            <p className='reset-pass-again'>Что-то пошло не так. Попробуйте ещё раз</p>
          </div>
          <button className='reset-pass-btn-again' type='button' onClick={() => window.location.reload()}>повторить</button>           
        </div>
        </div> :
        <div className='reset-pass'>
          <h1 className='company-title'>Cleverland</h1>
          <form className='reset-pass-form' onSubmit={handleSubmit(onSubmit)} data-test-id='reset-password-form'>
            <div className='reset-pass-block'>
              <h2 className='reset-pass-title'>Восстановление пароля</h2>
            </div>
            <div className='reset-pass-inputs'>  
              <div className='reset-pass-container'>
                  <input className={(errPass===true && emptyPass === '') ? 'reset-pass-input-warn' : 'reset-pass-input'} id='password' type={type} required='required'
                  {...register('password')} onBlur={(e)=>{setErrPass(true); setEmptyPass(e.target.value)}} onFocus={()=>{setErrPass(false); setEye(true)}} />
                  <label htmlFor='password' className='reset-pass-label'>Пароль</label>
                  {eye ? <button type='button' className='eye-icon'  data-test-id={type === 'password' ? 'eye-closed' : 'eye-opened'} onClick={togglePassInput}>{toggleIcon}</button> : null}
                  {(!getFieldState('password').invalid && getFieldState('password').isDirty) && <p className='check-icon'><Check data-test-id='checkmark'/></p>}
                  {(errPass===true && emptyPass === '') ?
                    <span className='error' data-test-id='hint'>Поле не может быть пустым</span> : 
                    errors.password?.message ? 
                      (errPass===false ?
                        (errors.password?.type === 'required' ? <span data-test-id='hint' className='error-span'>Пароль не менее 8 символов, с заглавной буквой и цифрой</span> :                          
                        <span className='error-span' data-test-id='hint'>Пароль <span data-test-id='hint' className={errors.password?.types?.min === 'не менее 8 символов' && 'hightlight'}>не менее 8 символов</span>, 
                    <span data-test-id='hint' className={(errors.password?.types.matches?.toString().includes('буквой,цифрой') || errors.password?.types?.matches === 'с заглавной буквой') && 'hightlight'}>с заглавной буквой</span> и 
                    <span data-test-id='hint' className={(errors.password?.types.matches?.toString().includes('буквой,цифрой') || errors.password?.types?.matches === 'цифрой') && 'hightlight'}>цифрой</span></span>
                        ) :
                          ((errPass===true && emptyPass !== '' && getFieldState('password').invalid) ? <span data-test-id='hint' className='error'>Пароль не менее 8 символов, с заглавной буквой и цифрой</span> :
                          <span className='error-span' data-test-id='hint'>Пароль не менее 8 символов, с заглавной буквой и цифрой</span>)
                          ) :
                      <span className='error-span' data-test-id='hint'>Пароль не менее 8 символов, с заглавной буквой и цифрой</span>
                    }
              </div>
              <div className='reset-pass-container'>
                  <input className={((errPassConfirm===true && emptyPassConfirm === '') || errors.passwordConfirmation?.type === 'oneOf') ? 'reset-pass-input-warn' : 'reset-pass-input'} id='passwordConfirmation' type={typeConfirm} required='required' 
                  {...register("passwordConfirmation")} onBlur={(e)=>{setErrPassConfirm(true); setEmptyPassConfirm(e.target.value)}} onFocus={()=>{setErrPassConfirm(false); setEyeConfirm(true)}}/>
                  <label htmlFor='passwordConfirmation' className='reset-pass-label'>Повторите пароль</label>
                  {eyeConfirm ? <button type='button' className='eye-icon' data-test-id={typeConfirm === 'password' ? 'eye-closed' : 'eye-opened'} onClick={togglePassConfirmInput}>{toggleIconConfirm}</button> : null}
                  {(errPassConfirm===true && emptyPassConfirm === '') ? <span className='error-span'><span className='hightlight' data-test-id='hint'>Поле не может быть пустым</span></span> :
                    (errPassConfirm===true && emptyPassConfirm !== '') ? (errors.passwordConfirmation?.type === 'oneOf') && <span className='error-span'><span className='hightlight' data-test-id='hint'>Пароли не совпадают</span></span> :
                    null
                  }
              </div>
            </div>           
            <button className='reset-pass-btn' disabled={getFieldState('passwordConfirmation').invalid && errPassConfirm} type='submit'>сохранить изменения</button>
            <p className='reset-pass-enter'>После сохранения войдите в библиотеку, используя новый пароль</p>
          </form>
        </div>
      }
      </div>
    </div>
    )
};