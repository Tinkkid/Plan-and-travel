import React from 'react'
import style from './Button.module.css'

const Button = ({ setModalIsOpen, removeTrip }) => {
  const removeSearchAndOpenModal = () => {
    removeTrip();
    setModalIsOpen(true);
  };
  return (
    <div>
      <button className={style.btn} onClick={removeSearchAndOpenModal}>
        <div className={style.btnPlus}>
          <ion-icon name="add-circle-outline"></ion-icon>
        </div>
        Add trip
      </button>
    </div>
  );
};

export default Button
