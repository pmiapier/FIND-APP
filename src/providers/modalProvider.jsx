import ItemDisputePage from '../modal/ItemDisputePage';
import CheckoutModel from '../modal/checkoutModel';
import LoginModal from '../modal/loginModal';
import RegisterModal from '../modal/registerModal';
import ChatPage from '../pages/chat/chatPage';

export const ModalProvider = () => {
  return (
    <>
      <LoginModal />
      <RegisterModal />
      <CheckoutModel />
      <ChatPage />
      <ItemDisputePage />
    </>
  );
};
