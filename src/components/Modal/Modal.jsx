import React from 'react';
import ReactDOM from 'react-dom';
import style from './Modal.module.css';

const Modal = ({ onClose, children }) => {;

  return ReactDOM.createPortal(
    <div className={style.modalBackdrop}>
      <div className={style.modalContent}>
        <div className={style.modalHeader}>
          <p>Create trip</p>
          <button className={style.modalCloseButton} onClick={onClose}>
            <ion-icon name="close-outline"></ion-icon>
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.getElementById('root')
  );
};

export default Modal;
