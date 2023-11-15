import Router from './router/Router';
import { ToastContainer } from 'react-toastify';
import { socket } from './pages/chat/confic/socket';
import { useAuth } from './hooks/useAuth';
export default function App() {

  return (
    <>
      <Router />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
