import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectWeatherData } from '../../redux/Weather/weatherSlice';
import { fetchWeatherForecast } from '../../redux/Weather/weatherOperations';
import style from './Forecast.module.css';

const Forecast = () => {
   const dispatch = useDispatch();
   const { loading, error, forecast } = useSelector(selectWeatherData);

  console.log('TCL: WeatherWidget ->forecast ', forecast);

   //   useEffect(() => {
   //     dispatch(
   //       fetchWeatherForecast({
   //         city: 'Kyiv',
   //         startDate: '2024-02-29',
   //         endDate: '2024-03-05',
   //       })
   //     );
   //   }, [dispatch]);

   return <div className={style.forecastWrapper}>{forecast && forecast.days.map(item => (
      <ul className={style.temperatureList}>
         <li>{Math.round(item.tempmax)}/{Math.round(item.tempmin)}</li>
      </ul>
   ))}</div>;
}

export default Forecast
