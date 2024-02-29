import React from 'react'
import style from './Footer.module.css'

const Footer = () => {

     const current_year = new Date().getFullYear();

  return (
    <div className={style.footer}>
      <p>&copy;{current_year} Всі права захищені. </p>
      <p>Created by </p>
      <a
        href="https://github.com/Tinkkid"
        target="_blank"
        rel="noopener noreferrer"
        className={style.myLink}
      >
        Yuliia Kostovynska
      </a>
    </div>
  );
}

export default Footer
