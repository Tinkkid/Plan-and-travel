import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectWeatherData } from '../../redux/Weather/weatherSlice';
import { fetchWeatherForecast } from '../../redux/Weather/weatherOperations';
import style from './Forecast.module.css';
import weatherIcons from '../../constans/weatherIcons'; 

const Forecast = () => {
   const dispatch = useDispatch();
   const { loading, error, forecast } = useSelector(selectWeatherData);
   const [iconsSrc, setIconsSrc] = useState({});

  console.log('TCL: WeatherWidget ->forecast ', forecast);

     useEffect(() => {
       dispatch(
         fetchWeatherForecast({
           city: 'Kyiv',
           startDate: '2024-02-29',
           endDate: '2024-03-05',
         })
       );
     }, [dispatch]);

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
               <div>
                 {iconsSrc[index] && (
                   <img src={iconsSrc[index]} alt={day.icon} />
                 )}
               </div>
               <div>
                 {Math.round(day.tempmax)}°/{Math.round(day.tempmin)}°
               </div>
             </li>
           </ul>
         ))}
     </div>
   );
}

export default Forecast
