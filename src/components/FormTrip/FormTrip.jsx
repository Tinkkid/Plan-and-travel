import React, { useState } from 'react'
import style from './FormTrip.module.css'
import DatePicker from '../DatePicker/DatePicker';

const FormTrip = () => {
  const [startDate, setStartDate] = useState(null);
  console.log("TCL: FormTrip -> startDate", startDate)
  const [endDate, setEndDate] = useState(null);
  console.log("TCL: FormTrip -> endDate", endDate)
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);

    const handleStartDateChange = date => {
      setStartDate(date);
      setShowStartCalendar(false);
    };

    const handleEndDateChange = date => {
      setEndDate(date);
      setShowEndCalendar(false);
    };

    return (
      <div>
        <form>
          <div className={style.container}>
            <div className={style.inputWrapper}>
              <label className={style.labelTitle}>
                <span className={style.starRequired}>*</span>City
              </label>
              <input
                className={style.inputContent}
                readOnly
                placeholder="Please select a city"
              />
            </div>
            <div className={style.inputWrapper}>
              <label className={style.labelTitle}>
                <span className={style.starRequired}>*</span>Start date
              </label>
              <div className={style.datePickerWrapper}>
                <button
                  className={`${
                    startDate
                      ? style.btnContent
                      : `${style.btnContent} ${style.btnContentPlaceholder}`
                  }`}
                  onClick={e => {
                    e.preventDefault();
                    setShowStartCalendar(true);
                  }}
                >
                  {startDate
                    ? `${('0' + startDate.getDate()).slice(-2)}.${(
                        '0' +
                        (startDate.getMonth() + 1)
                      ).slice(-2)}.${startDate.getFullYear()}`
                    : 'Select a date'}
                </button>
                {showStartCalendar && (
                  <DatePicker
                    selectedDate={startDate}
                    handleDateChange={handleStartDateChange}
                  />
                )}
              </div>
            </div>
            <div className={style.inputWrapper}>
              <label className={style.labelTitle}>
                <span className={style.starRequired}>*</span>End date
              </label>
              <div className={style.datePickerWrapper}>
                <button
                  className={`${
                    startDate
                      ? style.btnContent
                      : `${style.btnContent} ${style.btnContentPlaceholder}`
                  }`}
                  onClick={e => {
                    e.preventDefault();
                    setShowEndCalendar(true);
                  }}
                >
                  {endDate
                    ? `${('0' + endDate.getDate()).slice(-2)}.${(
                        '0' +
                        (endDate.getMonth() + 1)
                      ).slice(-2)}.${endDate.getFullYear()}`
                    : 'Select a date'}
                </button>
                {showEndCalendar && (
                  <DatePicker
                    selectedDate={endDate}
                    handleDateChange={handleEndDateChange}
                  />
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    );

};

export default FormTrip
