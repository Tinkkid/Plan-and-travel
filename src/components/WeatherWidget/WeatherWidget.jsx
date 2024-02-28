import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectWeatherData } from '../../redux/Weather/weatherSlice';
import { fetchCurrentWeather } from '../../redux/Weather/weatherOperations';

const WeatherWidget = () => {
     const dispatch = useDispatch();
     const { currentWeather, loading, error } = useSelector(selectWeatherData);
   // const currentWeather = useSelector(selectWeatherData);
   
   console.log('TCL: WeatherWidget ->currentWeather ', currentWeather);

     useEffect(() => {
       dispatch(fetchCurrentWeather('Odesa'));
     }, [dispatch]);

     if (loading) return <div>Loading...</div>;
     if (error) return <div>Error: {error}</div>;

  return (
    <div>
        <p></p>
        <p></p>
        <p></p>
        <div></div>
    </div>
  )
}

export default WeatherWidget
