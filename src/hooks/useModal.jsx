import { useContext } from 'react';
import { ModalContext } from '../context/modalContext';
export function useModal() {
  return useContext(ModalContext);
} // by สุดหล่อ
