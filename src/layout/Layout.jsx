import Footer from './Footer';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import { ModalProvider } from '../providers/modalProvider';

const Layout = () => {
  return (
    <div className='min-h-screen'>
      <Header />
      <Outlet />
      <div className="sticky  top-[100vh]"><Footer /></div>
      <ModalProvider />
    </div>
  );
};

export default Layout;
