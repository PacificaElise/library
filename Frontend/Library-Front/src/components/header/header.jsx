import { useParams } from 'react-router-dom';

import { Logo } from '../logo/logo';
import { PersonalInput } from '../personal-input/personal-input';
import { BurgerMenu } from '../burger-menu/burger-menu';

import './header.scss';

export const Header = () => {
const { profile } = useParams();
return (
  <header className='header'>
    <div className='title-container'>
        <BurgerMenu />
        <Logo />
      <h1 className='title'>{profile ? 'Личный кабинет' : 'Библиотека'}</h1>
    </div>
    <PersonalInput/>
  </header>
)
};

