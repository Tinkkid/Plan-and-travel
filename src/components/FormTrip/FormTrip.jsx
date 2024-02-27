import React, { useEffect, useRef, useState } from 'react';
import style from './FormTrip.module.css';
import DatePicker from '../DatePicker/DatePicker';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCities } from '../../redux/City/cityOperations';
import { selectCities } from '../../redux/City/citySlice';
import { useOutsideClick } from '../../hooks/useOutsideClick';

const FormTrip = () => {
  const dispatch = useDispatch()
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);
  const [showCitiesList, setShowCitiesList] = useState(false)
  const [showCities, setShowCities] = useState(false); 
  const [selectedCity, setSelectedCity] = useState(null); 
  console.log("TCL: FormTrip -> selectedCity", selectedCity)
  const [errorMessageCity, setErrorMessageCity] = useState('')
  const cities = useSelector(selectCities);
  console.log("TCL: FormTrip -> cities", cities)
  const refSelect = useRef();
  const refContent = useRef();

  const closeOptions = () => {
    setShowStartCalendar(false);
    setShowEndCalendar(false);
    setShowCitiesList(false);
  }
  useOutsideClick(refContent, refSelect, closeOptions);


  const handleStartDateChange = date => {
    setStartDate(date);
    setShowStartCalendar(false);
  };

  const handleEndDateChange = date => {
    setEndDate(date);
    setShowEndCalendar(false);
  };

  useEffect(() => {
    dispatch(fetchCities());
  }, [dispatch]);

    const handleCitySelect = city => {
      setSelectedCity(city.city);
      setShowCities(false);
    };

  const handleSubmit = e => {
    e.preventDefault();
    if (!selectedCity) {
      setErrorMessageCity('Please select a city');
    } else {
      setErrorMessageCity('great!')
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className={style.container}>
          <div className={style.inputWrapper}>
            <label className={style.labelTitle}>
              <span className={style.starRequired}>*</span>City
            </label>
            <input
              className={style.inputContent}
              readOnly
              ref={refSelect}
              placeholder="Please select a city"
              value={selectedCity ? selectedCity : ''}
              onClick={() => setShowCities(true)}
            />
            {showCities && (
              <div className={style.citiesDropdown} ref={refContent}>
                {cities.map(city => (
                  <div
                    key={city.id}
                    className={style.citiesOptions}
                    onClick={() => handleCitySelect(city)}
                  >
                    {city.city}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className={style.inputWrapper}>
            <label className={style.labelTitle}>
              <span className={style.starRequired}>*</span>Start date
            </label>
            <div className={style.datePickerWrapper}>
              <button
                className={`${
                  startDate
                    ? style.btnContent
                    : `${style.btnContent} ${style.btnContentPlaceholder}`
                }`}
                onClick={e => {
                  e.preventDefault();
                  setShowStartCalendar(true);
                  setShowEndCalendar(false);
                }}
              >
                {startDate
                  ? `${('0' + startDate.getDate()).slice(-2)}.${(
                      '0' +
                      (startDate.getMonth() + 1)
                    ).slice(-2)}.${startDate.getFullYear()}`
                  : 'Select a date'}
              </button>
              {showStartCalendar && (
                <DatePicker
                  selectedDate={startDate}
                  handleDateChange={handleStartDateChange}
                />
              )}
            </div>
          </div>
          <div className={style.inputWrapper}>
            <label className={style.labelTitle}>
              <span className={style.starRequired}>*</span>End date
            </label>
            <div className={style.datePickerWrapper}>
              <button
                className={`${
                  startDate
                    ? style.btnContent
                    : `${style.btnContent} ${style.btnContentPlaceholder}`
                }`}
                onClick={e => {
                  e.preventDefault();
                  setShowEndCalendar(true);
                  setShowStartCalendar(false);
                }}
              >
                {endDate
                  ? `${('0' + endDate.getDate()).slice(-2)}.${(
                      '0' +
                      (endDate.getMonth() + 1)
                    ).slice(-2)}.${endDate.getFullYear()}`
                  : 'Select a date'}
              </button>
              {showEndCalendar && (
                <DatePicker
                  selectedDate={endDate}
                  handleDateChange={handleEndDateChange}
                />
              )}
            </div>
          </div>
        </div>
        <button type="bitton">Cancel</button>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default FormTrip;
