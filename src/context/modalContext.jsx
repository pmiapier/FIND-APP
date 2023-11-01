import { createContext, useEffect } from "react";
import { useState } from "react";
// import axios from
import {
  addAccessToken,
  getAccessToken,
  removeAccessToken,
} from "../utils/local-storage";
import axios from "axios";
export const ModalContext = createContext();

export default function ModalContextProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  console.log("🚀 ~ file: modalContext.jsx:12 ~ ModalContextProvider ~ authUser:", authUser)
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const onOpenModal = (type) => {
    setIsOpenModal(true);
    setModalType(type);
  };
  useEffect(() => {
    console.log("type", modalType);
    console.log("isOpen", isOpenModal);
  }, [modalType, isOpenModal]);
  const onCloseModal = () => {
    setIsOpenModal(false);
  };

  const register = async (registerInputObject) => {
    const res = await axios.post("http://localhost:8080/auth/register", registerInputObject);
    addAccessToken(res.data.TOKEN);
    setAuthUser(res.data.user);
   
  };

  return (
    <ModalContext.Provider
      value={{ isOpenModal, onOpenModal, onCloseModal, modalType, register, authUser }}
    >
      {children}
    </ModalContext.Provider>
  );
}
