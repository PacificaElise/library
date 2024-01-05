import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import logo from '../../imgs/logo.svg';
import { clearControls } from '../../features/controls/controls-slice';

import './logo.scss';

export const Logo = () => {
  const dispatch = useDispatch()
  const cleanUp = () => dispatch(clearControls())

  return (
  <NavLink to='/' className='logo-container' onClick={cleanUp}>
    <img src={logo} alt='logo'/>
    <span className='logo-inscription'>Cleverland</span>
  </NavLink>
)};