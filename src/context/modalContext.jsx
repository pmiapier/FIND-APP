import { createContext, useEffect } from 'react';
import { useState } from 'react';
import { useProduct } from '../hooks/useProduct';
export const ModalContext = createContext();

export default function ModalContextProvider({ children }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [productId, setProductId] = useState(null);
  const { clearSelectedProduct } = useProduct();

  const onOpenModal = (type, id = null) => {
    setIsOpenModal(true);
    setModalType(type);
    setProductId(id);
  };
  useEffect(() => {
    // console.log('type', modalType);
    // console.log('isOpen', isOpenModal);
  }, [modalType, isOpenModal]);
  const onCloseModal = () => {
    setIsOpenModal(false);
    clearSelectedProduct();
  };
  return (
    <ModalContext.Provider value={{ isOpenModal, onOpenModal, onCloseModal, modalType, productId, setProductId }}>
      {children}
    </ModalContext.Provider>
  );
}
