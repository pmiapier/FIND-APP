import { createContext, useEffect } from 'react';
import { useState } from 'react';
export const ModalContext = createContext();

export default function ModalContextProvider({ children }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const onOpenModal = (type) => {
    setIsOpenModal(true);
    setModalType(type);
  };
  useEffect(() => {
    // console.log('type', modalType);
    // console.log('isOpen', isOpenModal);
  }, [modalType, isOpenModal]);
  const onCloseModal = () => {
    setIsOpenModal(false);
  };
  return (
    <ModalContext.Provider value={{ isOpenModal, onOpenModal, onCloseModal, modalType }}>
      {children}
    </ModalContext.Provider>
  );
}
