import React, { useState, useEffect } from 'react';
import style from './CountdownTimer.module.css'

const CountdownTimer = ({ startDate }) => {

  const parseStartDate = startDate
    ? new Date(startDate.split('.').reverse().join('-'))
    : null;

  const calculateTimeLeft = () => {
        if (!parseStartDate) return null;

    const difference = parseStartDate - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
     if (!parseStartDate) return;
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  if (!parseStartDate) {
    return <span>Choose a trip!</span>;
  }

  const timerComponents = [];

  if (timeLeft && typeof timeLeft === 'object' && Object.keys(timeLeft).length > 0) {

    Object.keys(timeLeft).forEach((interval, index) => {

      if (!timeLeft[interval]) {
        return;
      }

      timerComponents.push(
        <div key={index}>
          <p>{timeLeft[interval]}</p>
        </div>
      );
    });
  }


  return (
    <div>
      {timerComponents.length ? (
        <div className={style.timerWrapper}>{timerComponents}</div>
      ) : (
        <span>It's travel time!</span>
      )}
      <div className={style.timerTime}>
        {timeLeft && timeLeft.days > 0 && <span>Day</span>}
        {timeLeft && timeLeft.hours > 0 && <span>Hours</span>}
        {timeLeft && timeLeft.minutes > 0 && <span>Minutes</span>}
        {timeLeft &&  timeLeft.seconds > 0 && <span>Seconds</span>}
      </div>
    </div>
  );
};

  export default CountdownTimer;
