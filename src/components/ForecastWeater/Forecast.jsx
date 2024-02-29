import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectWeatherData } from '../../redux/Weather/weatherSlice';
import { fetchWeatherForecast } from '../../redux/Weather/weatherOperations';
import style from './Forecast.module.css';
import weatherIcons from '../../constans/weatherIcons'; 
import { formatDate, formatDateDefalult, getDayOfWeek } from '../../utils';

const Forecast = ({ currentTrip, selectedTrip }) => {
  const dispatch = useDispatch();
  const { loading, error, forecast } = useSelector(selectWeatherData);
  const [iconsSrc, setIconsSrc] = useState({});
  console.log("TCL: Forecast -> iconsSrc", iconsSrc)

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
         defaultStartDate = formatDate(selectedTrip.startDate)
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

  useEffect(() => {
    const fetchIcons = async () => {
      if (forecast) {
        const icons = {};
        await Promise.all(
          forecast.days.map(async (day, index) => {
            const iconPath = weatherIcons[day.icon];
            if (!iconPath) {
              const defaultIconKey = Object.keys(weatherIcons)[0];
              iconPath = weatherIcons[defaultIconKey];
            }

            if (iconPath) {
              const icon = await import(iconPath);
              icons[index] = icon.default;
            }
          })
        );
        setIconsSrc(icons);
      }
    };

    fetchIcons();
  }, [forecast]);

  return (
    <div className={style.forecastWrapper}>
      {forecast &&
        forecast.days.map((day, index) => (
          <ul key={index} className={style.temperatureList}>
            <li>
              <div className={style.forecastNameOdDay}>{getDayOfWeek(day.datetime)}</div>
              <div>
                {iconsSrc[index] && (
                  <img src={iconsSrc[index]} alt={day.icon} className={style.forecastIcon} />
                )}
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

export default Forecast
