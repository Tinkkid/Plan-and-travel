import React, { useEffect, useRef, useState } from 'react';
import style from './FormTrip.module.css';
import DatePicker from '../DatePicker/DatePicker';
import { useDispatch, useSelector } from 'react-redux';
import { addTrip, fetchCities } from '../../redux/City/cityOperations';
import { selectCities } from '../../redux/City/citySlice';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { formatDateString } from '../../utils';

const FormTrip = ({ setModalIsOpen, selectedTrip }) => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);
  const [showCities, setShowCities] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [photoCity, setPhotoCity] = useState('');
  const [cityAddress, setCityAddrress] = useState('');
  const [errorMessageCity, setErrorMessageCity] = useState('');
  const [errorMessageStartDate, setErrorMessageStartDate] = useState('');
  const [errorMessageEndDate, setErrorMessageEndDate] = useState('');
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
    setErrorMessageStartDate('');
  };

  const handleEndDateChange = date => {
    setEndDate(date);
    setShowEndCalendar(false);
    setErrorMessageEndDate('');
  };

  useEffect(() => {
    dispatch(fetchCities());
  }, [dispatch]);

  const handleCitySelect = city => {
    setSelectedCity(city.city);
    setErrorMessageCity('');
    setPhotoCity(city.url);
    setShowCities(false);
    setCityAddrress(city.city);
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
    }
    if (!startDate) {
      setErrorMessageStartDate('Please select a date');
      return;
    }
    if (!endDate) {
      setErrorMessageEndDate('Please select a date');
      return;
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

  const handleCancelClick = () => {
    setShowStartCalendar(false);
    setShowEndCalendar(false);
    setShowCities(false);
    setModalIsOpen(false);
    setSelectedCity('');
    setPhotoCity('');
    setCityAddrress('');
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
            {errorMessageCity && (
              <p className={style.errorMessage}>{errorMessageCity}</p>
            )}
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
                ref={refSelect}
              >
                {startDate ? formattedStartDate : 'Select a date'}
              </button>
              {errorMessageStartDate && (
                <p className={style.errorMessage}>{errorMessageStartDate}</p>
              )}
              {showStartCalendar && (
                <DatePicker
                  selectedDate={startDate}
                  handleDateChange={handleStartDateChange}
                  refContent={refContent}
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
                  endDate
                    ? style.btnContent
                    : `${style.btnContent} ${style.btnContentPlaceholder}`
                }`}
                onClick={e => {
                  e.preventDefault();
                  setShowEndCalendar(true);
                  setShowStartCalendar(false);
                  setShowCities(false);
                }}
                ref={refSelect}
              >
                {endDate ? formattedEndDate : 'Select a date'}
              </button>
              {errorMessageEndDate && (
                <p className={style.errorMessage}>{errorMessageEndDate}</p>
              )}
              {showEndCalendar && (
                <DatePicker
                  selectedDate={endDate}
                  handleDateChange={handleEndDateChange}
                  refContent={refContent}
                />
              )}
            </div>
          </div>
        </div>
        <div className={style.btnWrapper}>
          <button
            className={style.btnCancel}
            type="bitton"
            onClick={handleCancelClick}
          >
            Cancel
          </button>
          <button className={style.btnSubmit} type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormTrip;
