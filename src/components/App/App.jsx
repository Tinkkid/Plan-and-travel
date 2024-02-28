import { useDispatch, useSelector } from 'react-redux';
import { selectCities, selectTrip } from '../../redux/City/citySlice';
import Header from '../Header/Header';
import SearchTrip from '../SearchTrip/SearchTrip';
import { useEffect, useState } from 'react';
import { fetchCities } from '../../redux/City/cityOperations';
import TripCard from '../TripCard/TripCard';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import FormTrip from '../FormTrip/FormTrip';
import style from './App.module.css'
import WeatherWidget from '../WeatherWidget/WeatherWidget';
import Forecast from '../ForecastWeater/Forecast';

function App() {
  const dispatch = useDispatch()
  const cities = useSelector(selectCities);
  const newTripAdded = useSelector(selectTrip);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState('');
  const [currentTrip, setCurrentTrip] = useState('')

  useEffect(() => {
    dispatch(fetchCities());
  }, [dispatch])
  
  return (
    <>
      <Header />
      <div className={style.container}>
        <SearchTrip
          newTripAdded={newTripAdded}
          setSelectedTrip={setSelectedTrip}
          setCurrentTrip={setCurrentTrip}
        />
        <div className={style.containerTripAndWidget}>
          <TripCard
            cities={cities}
            newTripAdded={newTripAdded}
            selectedTrip={selectedTrip}
            setCurrentTrip={setCurrentTrip}
          />
          <Button setModalIsOpen={setModalIsOpen} />
          <div>
            <WeatherWidget
              currentTrip={currentTrip}
              selectedTrip={selectedTrip}
            />
          </div>
        </div>
        <Forecast currentTrip={currentTrip} selectedTrip={selectedTrip} />
      </div>

      {modalIsOpen && (
        <Modal onClose={() => setModalIsOpen(false)} isOpen={modalIsOpen}>
          <FormTrip setModalIsOpen={setModalIsOpen} />
        </Modal>
      )}
    </>
  );
}

export default App;
