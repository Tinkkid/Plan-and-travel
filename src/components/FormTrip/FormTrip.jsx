import React, { useEffect, useRef, useState } from 'react';
import style from './FormTrip.module.css';
import DatePicker from '../DatePicker/DatePicker';
import { useDispatch, useSelector } from 'react-redux';
import { addTrip, fetchAllTrip, fetchCities } from '../../redux/City/cityOperations';
import { selectCities } from '../../redux/City/citySlice';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { formatDateString } from '../../utils';

const FormTrip = ({ setModalIsOpen }) => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);
  const [showCities, setShowCities] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [photoCity, setPhotoCity] = useState('');
  const [cityAddress, setCityAddrress] = useState('')
  const [errorMessageCity, setErrorMessageCity] = useState('');
  const cities = useSelector(selectCities);

  const refSelect = useRef();
  const refContent = useRef();

  const closeOptions = () => {
    setShowStartCalendar(false);
    setShowEndCalendar(false);
    setShowCities(false);
  };
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
    setPhotoCity(city.url);
    setShowCities(false);
    setCityAddrress(city.address);
  };

  const formattedStartDate = formatDateString(startDate);
  const formattedEndDate = formatDateString(endDate);

  const handleSubmit = e => {
    e.preventDefault();
    if (!selectedCity) {
      setErrorMessageCity('Please select a city');
      return;
    } else {
      dispatch;
      setErrorMessageCity('great!');
    }
    const requestBody = {
      city: cityAddress,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      photo: photoCity,
      startDateNonFormatted: startDate,
    };
    try {
      dispatch(addTrip(requestBody));
      setModalIsOpen(false);
    } catch (error) {
      console.error('Error submitting form:', error);
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
              onClick={() => {
                setShowCities(true);
                setShowEndCalendar(false);
                setShowStartCalendar(false);
              }}
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
                  setShowCities(false);
                }}
              >
                {startDate ? formattedStartDate : 'Select a date'}
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
                  setShowCities(false);
                }}
              >
                {endDate ? formattedEndDate : 'Select a date'}
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
