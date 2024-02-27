import React, { useEffect, useState } from 'react';
import style from './DatePicker.module.css';
import { monthNames } from '../../constans/calendar';
import { getNumbersOfDaysInMoth, getSortedDays, range } from '../../utils';

const DatePicker = ({ selectedDate, handleDateChange }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

console.log('TCL: DatePicker -> selectedDate', selectedDate);
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

  const prevMonth = () => {
    if (currentMonth > 0) {
      setCurrentMonth(prev => prev - 1);
    } else {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    }
  };

  const handleSelectionDate = day => {
    const selected = new Date(currentYear, currentMonth, day);
    if (!isDateDisabled(selected)) {
      handleDateChange(selected);
    }
  };

  const isDateDisabled = date => {
    const currentDate = new Date();
    const today = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );
    const lastSelectableDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 15
    );

    if (date.getTime() === today.getTime()) {
      return false;
    } else {
      return date < today || date > lastSelectableDate;
    }
  };

  const isFirstMonth =
    currentYear === new Date().getFullYear() &&
    currentMonth === new Date().getMonth();
  const isLastMonth =
    (currentYear === new Date().getFullYear() + 1 && currentMonth === 11) ||
    (currentYear === new Date().getFullYear() &&
      currentMonth === new Date().getMonth() + 1);

  return (
    <div className={style.calendar}>
      <div className={style.calendarHeader}>
        {!isFirstMonth && (
          <ion-icon name="chevron-back-outline" onClick={prevMonth}></ion-icon>
        )}
        <p>
          {monthNames[currentMonth]} {currentYear}
        </p>
        {!isLastMonth && (
          <ion-icon
            name="chevron-forward-outline"
            onClick={nextMonth}
          ></ion-icon>
        )}
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
                    ? `${style.disabled} ${style.calendarDate}`
                    : style.calendarDate
                } ${
                  selectedDate &&
                  selectedDate.getDate() === day &&
                  selectedDate.getMonth() === currentMonth &&
                  selectedDate.getFullYear() === currentYear
                    ? `${style.selected} ${style.calendarDate}`
                    : style.calendarDate
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

export default DatePicker;
