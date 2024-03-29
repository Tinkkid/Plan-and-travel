import { useDispatch, useSelector } from 'react-redux';
import {
  selectAlltrips,
  selectCities,
  selectTrip,
} from '../../redux/City/citySlice';
import { useEffect, useState } from 'react';

import Header from '../Header/Header';
import SearchTrip from '../SearchTrip/SearchTrip';
import { fetchCities } from '../../redux/City/cityOperations';
import TripCard from '../TripCard/TripCard';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import FormTrip from '../FormTrip/FormTrip';
import style from './App.module.css';
import WeatherWidget from '../WeatherWidget/WeatherWidget';
import Forecast from '../ForecastWeater/Forecast';
import SortingFilter from '../SortingFilter/SortingFilter';
import Chips from '../Chips/Chips';
import Footer from '../Footer/Footer';

function App() {
  const dispatch = useDispatch();
  const cities = useSelector(selectCities);
  const trips = useSelector(selectAlltrips);
  const newTripAdded = useSelector(selectTrip);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState('');
  const [currentTrip, setCurrentTrip] = useState('');
  const [searchingTrip, setSearchingTrip] = useState('');
  const [sortedTrips, setSortedTrips] = useState([]);
  const [sortBy, setSortBy] = useState('default');

  const removeTrip = () => {
    setSearchingTrip('');
    setSelectedTrip('');
    setCurrentTrip(null);
  };

  useEffect(() => {
    dispatch(fetchCities());
  }, [dispatch]);

  useEffect(() => {
    sortTrips(trips);
  }, [trips, sortBy]);

  const handleChangeSortBy = e => {
    setSortBy(e.target.value);
  };

  const sortTrips = trips => {
    let sorted = [...trips];
    if (sortBy === 'date') {
      sorted = trips.slice().sort((a, b) => {
        const dateA = new Date(a.startDate.split('.').reverse().join('-'));
        const dateB = new Date(b.startDate.split('.').reverse().join('-'));
        return dateA - dateB;
      });
    }
    setSortedTrips(sorted);
  };

  return (
    <>
      <div className={style.mainContainer}>
        <Header />
        <div className={style.container}>
          <div className={style.containerTripAndWidget}>
            <div className={style.containerSearchTripBtn}>
              <div>
                <SearchTrip
                  newTripAdded={newTripAdded}
                  setSelectedTrip={setSelectedTrip}
                  setCurrentTrip={setCurrentTrip}
                  searchingTrip={searchingTrip}
                  setSearchingTrip={setSearchingTrip}
                  removeTrip={removeTrip}
                />
                <div className={style.sortAndChips}>
                  <SortingFilter
                    handleChangeSortBy={handleChangeSortBy}
                    sortBy={sortBy}
                  />
                  {selectedTrip && (
                    <Chips
                      removeTrip={removeTrip}
                      selectedTrip={selectedTrip}
                    />
                  )}
                </div>
              </div>
              <div className={style.containerTripAndAddBtn}>
                <TripCard
                  cities={cities}
                  trips={trips}
                  selectedTrip={selectedTrip}
                  setCurrentTrip={setCurrentTrip}
                  currentTrip={currentTrip}
                  setSortedTrips={setSortedTrips}
                  sortedTrips={sortedTrips}
                  removeTrip={removeTrip}
                />
                <Button
                  setModalIsOpen={setModalIsOpen}
                  removeTrip={removeTrip}
                />
              </div>
            </div>

            <div>
              <WeatherWidget
                currentTrip={currentTrip}
                selectedTrip={selectedTrip}
              />
            </div>
          </div>
          <div>
            <Forecast currentTrip={currentTrip} selectedTrip={selectedTrip} />
          </div>
        </div>
        <Footer />
        {modalIsOpen && (
          <Modal onClose={() => setModalIsOpen(false)} isOpen={modalIsOpen}>
            <FormTrip setModalIsOpen={setModalIsOpen} />
          </Modal>
        )}
      </div>
    </>
  );
}

export default App;
