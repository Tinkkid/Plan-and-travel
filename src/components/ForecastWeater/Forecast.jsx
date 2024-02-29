import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectWeatherData } from '../../redux/Weather/weatherSlice';
import { fetchWeatherForecast } from '../../redux/Weather/weatherOperations';
import style from './Forecast.module.css';
import { formatDate, formatDateDefalult, getDayOfWeek } from '../../utils';
import { IconsWeather } from '../../constans/weatherIcons';

const Forecast = ({ currentTrip, selectedTrip }) => {
  const dispatch = useDispatch();
  const { forecast } = useSelector(selectWeatherData);

  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);

  const formattedToday = formatDateDefalult(today);
  const formattedNextWeek = formatDateDefalult(nextWeek);

  useEffect(() => {
    let defaultCity = 'Kyiv';
    let defaultStartDate = formattedToday;
    let defaultEndDate = formattedNextWeek;

    if (selectedTrip) {
      defaultCity = selectedTrip.cityForWeather;
      defaultStartDate = formatDate(selectedTrip.startDate);
      defaultEndDate = formatDate(selectedTrip.endDate);
    } else if (currentTrip) {
      defaultCity = currentTrip.cityForWeather;
      defaultStartDate = formatDate(currentTrip.startDate);
      defaultEndDate = formatDate(currentTrip.endDate);
    }
    dispatch(
      fetchWeatherForecast({
        city: defaultCity,
        startDate: defaultStartDate,
        endDate: defaultEndDate,
      })
    );
  }, [dispatch, currentTrip, selectedTrip]);

  return (
    <div className={style.forecastWrapper}>
      {forecast &&
        forecast.days.map((day, index) => (
          <ul key={index} className={style.temperatureList}>
            <li>
              <div className={style.forecastNameOdDay}>
                {getDayOfWeek(day.datetime)}
              </div>
              <div>
                <img
                  src={IconsWeather[day.icon]}
                  alt={day.icon}
                  className={style.forecastIcon}
                />
              </div>
              <div className={style.forecastTemperature}>
                {Math.round(day.tempmax)}°/ {Math.round(day.tempmin)}°
              </div>
            </li>
          </ul>
        ))}
    </div>
  );
};

export default Forecast;
