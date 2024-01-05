import { Outlet } from 'react-router-dom';
import { Sidebar } from '../../components/sidebar/sidebar';

import './layout-main-page.scss';

export const LayoutMainPage = () => (
    <main className='main'>
      <Sidebar />
      <Outlet />
    </main>
  );


