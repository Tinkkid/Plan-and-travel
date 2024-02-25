import React, { useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import style from './FormTrip.module.css'

const FormTrip = () => {
  const [startDate, setStartDate] = useState(null);
  console.log("TCL: FormTrip -> startDate", startDate)
  const [endDate, setEndDate] = useState(null);
  console.log("TCL: FormTrip -> endDate", endDate)

  return (
    <div>
      <form className={style.formWrapper}>
        <div className={style.inputWrapper}>
          {' '}
          <label className={style.labelTitle}>
            <span className={style.starRequired}>*</span>City
          </label>
          <input className={style.inputContent} />
        </div>
        <div className={style.inputWrapper}>
          <label className={style.labelTitle}>
            <span className={style.starRequired}>*</span>Start date
          </label>
          <DatePicker
            dateFormat="dd.MM.yyyy"
            selected={startDate}
            onChange={date => setStartDate(date)}
            minDate={new Date()}
            maxDate={new Date(new Date().getTime() + 15 * 24 * 60 * 60 * 1000)}
            className={style.inputContent}
          />
        </div>

        <div className={style.inputWrapper}>
          <label className={style.labelTitle}>
            <span className={style.starRequired}>*</span>End date
          </label>
          <DatePicker
            dateFormat="dd.MM.yyyy"
            selected={endDate}
            onChange={date => setEndDate(date)}
            minDate={startDate || new Date()}
            maxDate={new Date(new Date().getTime() + 15 * 24 * 60 * 60 * 1000)}
            className={style.inputContent}
          />
        </div>
      </form>
    </div>
  );
};

export default FormTrip
