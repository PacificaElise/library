/* eslint-disable */

import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import InputMask from 'react-input-mask';

import { fetchRegister, selectRegInfo, clearReg } from '../../features/reg/reg-slice';
import {ReactComponent as RegArrow} from '../../imgs/icons/reg-arrow.svg';
import { selectIsAuth } from '../../features/auth/auth-slice';

import {RegSchema} from '../../validation/reg-schema';
import {ReactComponent as ClosedEye} from '../../imgs/icons/closed-eye.svg';
import {ReactComponent as OpenedEye} from '../../imgs/icons/opened-eye.svg';
import {ReactComponent as Check} from '../../imgs/icons/check.svg';

import './registration-page.scss';

export const RegistrationPage = () => { 
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const {statusReg, errorReg} = useSelector(selectRegInfo);
  const [toggleIcon, setToggleIcon] = useState(<ClosedEye/>);
  const [type, setType] = useState('password');  
  const [eye, setEye] = useState(false);
  const [errUsername, setErrUsername] = useState(false);
  const [emptyUsername, setEmptyUsername] = useState('');
  const [errPass, setErrPass] = useState(false);
  const [emptyPass, setEmptyPass] = useState('');

  const {
    register,
    formState: { errors, isValid },
    setFocus,
    handleSubmit,
    reset,
    getFieldState,
    watch 
  } = useForm({
    mode: 'all',
    criteriaMode: "all",
    resolver: yupResolver(RegSchema),
    defaultValues: {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
    }
  }
  );

  useEffect(() => {
    setFocus('username');
  }, []);
  
  const [disabled, setDisabled] = useState(true);
  const [disabled2, setDisabled2] = useState(true);

  useEffect (() => {
    setDisabled(
      (getFieldState('username').isDirty === true && getFieldState('username').invalid === false && 
      getFieldState('password').isDirty === true && getFieldState('password').invalid === false) ? 
      false : true)}, [
        getFieldState('username').isDirty, 
        getFieldState('username').invalid, 
      getFieldState('password').isDirty,
      getFieldState('password').invalid]);

      
  const firstName = watch('firstName');
  const lastName = watch('lastName');

  useEffect (() => {
    setDisabled2(
      (getFieldState('firstName').isDirty === true && getFieldState('firstName').invalid === false && 
      getFieldState('lastName').isDirty === true && getFieldState('lastName').invalid === false) ? 
      false : true);
  }, [firstName, lastName])

  const onSubmit = (values) => { 
    dispatch(fetchRegister(values));
    reset();
    setStep(1);
    setDisabled(true);
    setDisabled2(true)
  }

  if (isAuth) {
    return <Navigate to='/books/all'/>
  }

  const togglePassInput = () => {
    if (type === 'password') {
      setType('text');
      setToggleIcon(<OpenedEye/>)
    } else {
      setType('password');
      setToggleIcon(<ClosedEye/>)
    }
  }

  const cleanReg = () => dispatch(clearReg());


  const formatChars = {
      '9': '[0-9]',
      '*': '[2,3,4,5,9]'
  };

  return (
  <div className='loader-wrapper' data-test-id='auth'>
    {statusReg === 'loading' ?
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
    <div className={statusReg === 'loading' ? 'reg-wrapper blur' : 'reg-wrapper'}>
    {statusReg === 'recieved' ? 
      <div className='reg'>
      <h1 className='company-title'>Cleverland</h1>
      <div className='reg-form-err' data-test-id='status-block'>
        <div className='reg-block'>
          <h2 className='reg-title'>Регистрация успешна</h2>
        </div>
        <div className='reg-inputs'>
          <p className='reg-again'>Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и пароль</p>
        </div>           
        <button className='reg-btn-again' type='button'><NavLink to='/auth'>вход</NavLink></button>
      </div>
      </div>
      : 
      (errorReg) ? 
        (<div className='reg'>
          <h1 className='company-title'>Cleverland</h1>
          <div className='reg-form-err' data-test-id='status-block'>
            <div className='reg-block'>
              <h2 className='reg-title'>Данные не сохранились</h2>
            </div>
            <div className='reg-inputs'>
            {errorReg.includes('400') ?
              <p className='reg-again'>Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail</p> :
              <p className='reg-again'>Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз</p>
            }
            </div>           
            {errorReg.includes('400') ? <button className='reg-btn-again' type='button' onClick={() => {
                cleanReg(); 
                }
              }>
              <NavLink to='/registration'>назад к регистрации</NavLink>
            </button> : <button className='reg-btn-again' type='button' onClick={() => {
                cleanReg(); 
                }
              }>
              <NavLink to='/registration'>повторить</NavLink>
            </button>
            }
          </div>
        </div>)
        : 
        (<div className='reg'>
          <h1 className='company-title'>Cleverland</h1>
          <form className='reg-form' onSubmit={handleSubmit(onSubmit)} data-test-id='register-form'>
            <div className='reg-block'>
              <h2 className='reg-title'>Регистрация</h2>
              <span className='reg-step'>{step} шаг из 3</span>
            </div>
            {step === 1 && (
            <>
              <div className='reg-inputs'>
                <div className='reg-container'>
                  <input className={(errUsername===true && emptyUsername === '') ? 'reg-input-warn' : 'reg-input'} id='username' type='text' required='required'  
                  {...register('username')} onBlur={(e)=>{setErrUsername(true); setEmptyUsername(e.target.value)}} onFocus={()=>setErrUsername(false)} />
                  <label htmlFor='username' className='reg-label'>Придумайте логин для входа</label>
                  {(errUsername===true && emptyUsername === '') ?
                    <span className='error' data-test-id='hint'>Поле не может быть пустым</span> : 
                    errors.username?.message ? 
                      (errUsername===false ?
                        (errors.username?.type === 'required' ? <span data-test-id='hint' className='error-span'>Используйте для логина латинский алфавит и цифры</span> :
                          <span className='error-span' data-test-id='hint'>Используйте для логина <span data-test-id='hint' className={(errors.username?.types.matches?.toString().includes('алфавит,цифры') || errors.username?.types?.matches === 'латинский алфавит') && 'hightlight'}>латинский алфавит</span> и
                          <span data-test-id='hint' className={(errors.username?.types.matches?.toString().includes('алфавит,цифры') || errors.username?.types?.matches === 'цифры') && 'hightlight'}>цифры</span></span>) :
                          ((errUsername===true && emptyUsername !== '' && getFieldState('username').invalid) ? <span data-test-id='hint' className='error'>Используйте для логина латинский алфавит и цифры</span> :
                          <span className='error-span' data-test-id='hint'>Используйте для логина латинский алфавит и цифры</span>)
                          ) :
                      <span className='error-span' data-test-id='hint'>Используйте для логина латинский алфавит и цифры</span>
                    }
                </div>
                <div className='reg-container'>
                  <input className={(errPass===true && emptyPass === '') ? 'reg-input-warn' : 'reg-input'} id='password' type={type} required='required'
                  {...register('password')} onBlur={(e)=>{setErrPass(true); setEmptyPass(e.target.value)}} onFocus={()=>{setErrPass(false); setEye(true)}} />
                  <label htmlFor='password' className='reg-label'>Пароль</label>
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
              </div>
              <button disabled={disabled} className='reg-btn' type='button' onClick={() => {setStep(prevStep => prevStep+1)}}>следующий шаг</button>
            </>
          )}
          {step === 2 && (
            <>
              <div className='reg-inputs'>
                <div className='reg-container'>
                  <input className={errors.firstName?.type === 'required' ? 'reg-input-warn' : 'reg-input'} id='firstName' type='text' required='required'  
                  {...register('firstName')}/>
                  <label htmlFor='firstName' className='reg-label'>Имя</label>
                  <span data-test-id='hint' className='error'>{errors.firstName?.message}</span>
                </div>
                  
                <div className='reg-container'>
                  <input className={errors.lastName?.type === 'required' ? 'reg-input-warn' : 'reg-input'} id='lastName' type='text' required='required'   
                  {...register('lastName')}/>
                  <label htmlFor='lastName' className='reg-label'>Фамилия</label>
                  <span data-test-id='hint' className='error'>{errors.lastName?.message}</span>
                </div>
              </div>
              <button disabled={disabled2} className='reg-btn' type='button' onClick={() => {setStep(prevStep => prevStep+1)}}>последний шаг</button>
            </>
          )}
          {step === 3 && (
            <>
              <div className='reg-inputs'>
                <div className='reg-container'>
                <InputMask className={(errors.phone?.type === 'required' || errors.phone?.type === 'matches') ? 'reg-input-warn' : 'reg-input'}  id='phone' type='tel' required='required' 
                  {...register('phone')} mask='+375 (**) 999-99-99' maskChar='x' formatChars={formatChars}
                  />
                  <label htmlFor='phone' className='reg-label'>Номер телефона</label>
                  {(errors.phone?.message) ? <span data-test-id='hint' className='error'>{errors.phone?.message}</span> : <span data-test-id='hint' className='error-span'>В формате +375 (xx) xxx-xx-xx</span>}
                </div>   
                <div className='reg-container'>
                  <input className={errors.email?.type === 'required' ? 'reg-input-warn' : 'reg-input'} id='email' type='text' required='required' 
                  {...register('email')}/>
                  <label htmlFor='email' className='reg-label'>E-mail</label>
                  <span data-test-id='hint' className='error'>{errors.email?.message}</span>
                </div>  
              </div>
              <button disabled={!isValid} className='reg-btn' type='submit'>зарегистрироваться</button>
            </>
          )}
            <p className='reg-enter'>Есть учётная запись?
              <span>
                <NavLink to='/auth' className='reg-login'>войти</NavLink>
                <NavLink to='/auth' className='reg-login'><RegArrow/></NavLink>
              </span>
            </p>
          </form>
        </div>)
    }
    </div>
  </div>
  )
};