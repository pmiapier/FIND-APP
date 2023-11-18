import ItemDisputePage from '../modal/ItemDisputePage';
import CheckoutModel from '../modal/checkoutModel';
import LoginModal from '../modal/loginModal';
import RegisterModal from '../modal/registerModal';
import ChatPage from '../pages/chat/chatPage';
import AddProductPage from '../pages/user/AddProductPage';
import EditProductPage from '../pages/user/EditProductPage';

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
