import React from 'react'
import style from './Header.module.css';

const Header = () => {
  return (
    <div className={style.wrapper}>
      <h1 className={style.title}>Weather Forecast</h1>
      <p> Plan a trip and discover Ukraine!</p>
    </div>
  );
}

export default Header
