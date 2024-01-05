import './footer.scss';
import facebook from '../../imgs/icons/facebook.svg';
import instagram from '../../imgs/icons/instagram.svg';
import vk from '../../imgs/icons/vk.svg';
import lnkdn from '../../imgs/icons/lnkdn.svg';

export const Footer = () => (
  <footer>
    <div className='footer-content'>
    <p className='rights'>© 2020-2023 Cleverland. Все права защищены.</p>
      <div className='networks-container'>
        <a href='https://ru-ru.facebook.com/' className='facebook'><img src={facebook} alt='facebook-icon'/></a>
        <a href='https://www.instagram.com/' className='instagram'><img src={instagram} alt='instagram-icon'/></a>
        <a href='https://vk.com/' className='vk'><img src={vk} alt='vk-icon'/></a>
        <a href='https://www.linkedin.com/' className='lnkdn'><img src={lnkdn} alt='lnkdn-icon'/></a>
      </div>
    </div>
  </footer>
);

