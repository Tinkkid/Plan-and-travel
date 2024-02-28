import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectWeatherData } from '../../redux/Weather/weatherSlice';
import { fetchCurrentWeather } from '../../redux/Weather/weatherOperations';
import style from './WeatherWidget.module.css';
import { getFullNameOfCurrentDay } from '../../utils';
import weatherIcons from '../../constans/weatherIcons'; 

const WeatherWidget = () => {
  const dispatch = useDispatch();
  const { currentWeather, loading, error } = useSelector(selectWeatherData);
  const currentNameOfDay = getFullNameOfCurrentDay();
  const weatherIcon = currentWeather?.days[0].icon;
  const [iconSrc, setIconSrc] = useState(null);

  useEffect(() => {
    dispatch(fetchCurrentWeather('Rivne'));
  }, [dispatch]);

  useEffect(() => {
    const fetchIcon = async () => {
      if (weatherIcon) {
        const iconPath = weatherIcons[weatherIcon];
        if (iconPath) {
          const icon = await import(iconPath); 
          setIconSrc(icon.default);
        }
      }
    };
    fetchIcon();
  }, [weatherIcon]);

  const firstDayTemp = currentWeather?.days[0].temp;
  const roundedTemp = Math.round(firstDayTemp);

  if (loading) return <div>Loading...</div>;

  return (
    <div className={style.widgetWrapper}>
      <div className={style.widgetWeatherWrapper}>
        {iconSrc && (
          <img src={iconSrc} alt={weatherIcon} className={style.weatherIcon} />
        )}
        <p className={style.widgetDay}>{currentNameOfDay}</p>
        <p className={style.widgetTemperature}>{roundedTemp}</p>
        <p className={style.widgetCity}></p>
      </div>
      <div>Count</div>
    </div>
  );
};

export default WeatherWidget;
