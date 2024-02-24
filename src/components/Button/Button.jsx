import React from 'react'
import style from './Button.module.css'

const Button = ({ setModalIsOpen }) => {
  return (
    <div>
      <button className={style.btn} onClick={() => setModalIsOpen(true)}>
        Add trip
      </button>
    </div>
  );
};

export default Button
