import React from 'react'
import style from './FormTrip.module.css'

const FormTrip = () => {
  return (
    <div>
      <form className={style.formWrapper}>
        <label className={style.labelTitle}>
          City <span className={style.star}>*</span>
          <input />
        </label>
        <label>
          Start date <span className={style.star}>*</span>
          <input />
        </label>
        <label>
          End date <span className={style.star}>*</span>
          <input />
        </label>
      </form>
    </div>
  );
};

export default FormTrip
