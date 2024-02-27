import { useDispatch, useSelector } from 'react-redux';
import { selectAlltrips, selectCities, selectTrip } from '../../redux/City/citySlice';
import Header from '../Header/Header';
import SearchTrip from '../SearchTrip/SearchTrip';
import { useEffect, useState } from 'react';
import { fetchAllTrip, fetchCities } from '../../redux/City/cityOperations';
import TripCard from '../TripCard/TripCard';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import FormTrip from '../FormTrip/FormTrip';
import style from './App.module.css'

function App() {
  const dispatch = useDispatch()
  const cities = useSelector(selectCities);
  const newTripAdded = useSelector(selectTrip);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState('');

  useEffect(() => {
    dispatch(fetchCities());
  }, [dispatch])
  

  return (
    <>
      <Header />
      <SearchTrip
        newTripAdded={newTripAdded}
        setSelectedTrip={setSelectedTrip}
      />
      <div className={style.container}>
        <TripCard
          cities={cities}
          newTripAdded={newTripAdded}
          selectedTrip={selectedTrip}
        />
        <Button setModalIsOpen={setModalIsOpen} />
        <div>Weather widget</div>
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
