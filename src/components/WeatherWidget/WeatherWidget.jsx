import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectWeatherData } from '../../redux/Weather/weatherSlice';
import { fetchCurrentWeather } from '../../redux/Weather/weatherOperations';
import style from './WeatherWidget.module.css';
import { getFullNameOfCurrentDay } from '../../utils';
import weatherIcons from '../../constans/weatherIcons';
import CountdownTimer from '../CountdownTimer/CountdownTimer';

const WeatherWidget = ({ currentTrip, selectedTrip }) => {
  const dispatch = useDispatch();
  const { currentWeather, loading, error } = useSelector(selectWeatherData);
  const currentNameOfDay = getFullNameOfCurrentDay();
  const weatherIcon = currentWeather?.days[0].icon;
  const [iconSrc, setIconSrc] = useState(null);

  useEffect(() => {
    let defaultCity = 'Kyiv';
    if (selectedTrip && selectedTrip.cityForWeather) {
      defaultCity = selectedTrip.cityForWeather;
    } else if (currentTrip && currentTrip.cityForWeather) {
      defaultCity = currentTrip.cityForWeather;
    }
    dispatch(fetchCurrentWeather(defaultCity));
  }, [dispatch, currentTrip, selectedTrip]);

  useEffect(() => {
    const fetchIcon = async () => {
      if (weatherIcon) {
        const iconPath = weatherIcons[weatherIcon];
        if (iconPath) {
          const icon = await import(iconPath);
          setIconSrc(icon.default);
        }
        if (!iconPath) {
          const defaultIconKey = Object.keys(weatherIcons)[0];
          iconPath = weatherIcons[defaultIconKey];
        }
      }
    };
    fetchIcon();
  }, [weatherIcon]);

  const firstDayTemp = currentWeather?.days[0].temp;
  const roundedTemp = Math.round(firstDayTemp);

  if (loading) return <div className={style.widgetWrapper}>Loading...</div>;

   const getNameOfCity = () => {
     if (currentTrip) {
       return currentTrip.city;
     } else if (selectedTrip) {
       return selectedTrip.city;
     } else {
       return 'Kyiv';
     }
   };

  const getStartDate = () => {
    if (currentTrip) {
      return currentTrip.startDate;
    } else if (selectedTrip) {
      return selectedTrip.startDate;
    } else {
      return null;
    }
  };

  const startDate = getStartDate();
  const nameOfCity = getNameOfCity();

  return (
    <div className={style.widgetWrapper}>
      <div className={style.widgetWeatherWrapper}>
        <p className={style.widgetDay}>{currentNameOfDay}</p>
        <div className={style.widgetTemperatureAndIcon}>
          {iconSrc && (
            <img
              src={iconSrc}
              alt={weatherIcon}
              className={style.weatherIcon}
            />
          )}
          <p className={style.widgetTemperature}>{roundedTemp}&deg;C</p>
        </div>
        <p className={style.widgetCity}>{nameOfCity}</p>
        <CountdownTimer startDate={startDate} />
      </div>
    </div>
  );
};

export default WeatherWidget;
