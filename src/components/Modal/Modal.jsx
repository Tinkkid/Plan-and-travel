import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

const Modal = ({ onClose, children }) => {;

  return ReactDOM.createPortal(
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <button className={styles.modalCloseButton} onClick={onClose}>
          Close
        </button>
        {children}
      </div>
    </div>,
    document.getElementById('root')
  );
};

export default Modal;
