import Router from './router/Router';
import { ToastContainer } from 'react-toastify';
import { socket } from './pages/chat/confic/socket';
import { useAuth } from './hooks/useAuth';
import { useEffect } from 'react';

export default function App() {
  const { authUser } = useAuth();
  useEffect(() => {
    if (authUser) {
      socket.auth = { authUser }
      socket.connect()
    }
    return () => {
      socket.disconnect()
    }
  }, [])



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
