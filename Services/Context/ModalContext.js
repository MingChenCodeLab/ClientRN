// ModalContext.js
import React, { createContext, useReducer, useContext } from 'react';
import modalReducer from './ModalReducer';

const ModalContext = createContext();

const initialState = {
  isVisible: false,
  modalType: null,
  modalData: null,
};

export function ModalProvider({ children }) {
  const [state, dispatch] = useReducer(modalReducer, initialState);

  const openModal = (modalType, modalData) => {
    dispatch({ type: 'OPEN_MODAL', modalType, modalData });
  };

  const closeModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  };

  const updateModalData = (payload) => {
    dispatch({ type: 'UPDATE_MODAL_DATA', payload });
  };

  return (
    <ModalContext.Provider value={{ state, openModal, closeModal, updateModalData }}>
      {children}
    </ModalContext.Provider>
  );
}

export const useModal = () => useContext(ModalContext);
