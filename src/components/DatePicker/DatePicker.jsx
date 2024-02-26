import React, { useEffect, useState } from 'react'
import style from './DatePicker.module.css'
import { monthNames } from '../../constans/calendar';
import { getNumbersOfDaysInMoth, getSortedDays, range } from '../../utils';

const DatePicker = ({ selectedDate, handleDateChange }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    useEffect(() => {
      setCurrentMonth(new Date().getMonth());
      setCurrentYear(new Date().getFullYear());
    }, [selectedDate]);


  const nextMonth = () => {
    if (currentMonth < 11) {
      setCurrentMonth(prev => prev + 1);
    } else {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    }
  };

  const handleSelectionDate = day => {
    const selected = new Date(currentYear, currentMonth, day);
    handleDateChange(selected);
  };

  const isDateDisabled = date => {
    const currentDate = new Date();
    const lastSelectableDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 15
    );
    return date < currentDate || date > lastSelectableDate;
  };


  return (
    <div className={style.calendar}>
      <div className={style.calendarHeader}>
        <p>
          {monthNames[currentMonth]} {currentYear}
        </p>
        <ion-icon name="chevron-forward-outline" onClick={nextMonth}></ion-icon>
      </div>
      <div className={style.calendarBody}>
        <div className={style.calendarDays}>
          {getSortedDays(currentYear, currentMonth).map(day => (
            <p key={day}>{day}</p>
          ))}
        </div>
        <div className={style.calendarDays}>
          {range(1, getNumbersOfDaysInMoth(currentYear, currentMonth) + 1).map(
            day => (
              <p
                key={day}
                className={`${
                  isDateDisabled(new Date(currentYear, currentMonth, day))
                    ? style.disabled
                    : ''
                } ${
                  selectedDate && selectedDate.getDate() === day
                    ? style.selected
                    : ''
                }`}
                onClick={() => handleSelectionDate(day)}
              >
                {day}
              </p>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default DatePicker
