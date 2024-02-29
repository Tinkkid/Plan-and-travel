import { useDispatch, useSelector } from 'react-redux';
import { selectAlltrips } from '../../redux/City/citySlice';
import { useEffect, useState } from 'react';
import { fetchAllTrip } from '../../redux/City/cityOperations';
import style from './SearchTrip.module.css';

const SearchTrip = ({
  newTripAdded,
  setSelectedTrip,
  setCurrentTrip,
  searchingTrip,
  setSearchingTrip,
  removeTrip
}) => {
  const dispatch = useDispatch();
  const trips = useSelector(selectAlltrips);

  const [filtredTrip, setFiltredTrip] = useState([]);
  const [showFiltredTrip, setShowFiltredTrip] = useState(false);

  useEffect(() => {
    dispatch(fetchAllTrip());
  }, [dispatch, newTripAdded]);

  const handleOnchangeTrip = e => {
    const searchValue = e.target.value
      .toLowerCase()
      .replace(/[^a-zA-Z\u0400-\u04FF]/g, '');
    setSearchingTrip(searchValue);
    const filtredValue = trips?.filter(item => {
      return item.city.toLowerCase().includes(searchValue);
    });
    setFiltredTrip(filtredValue);
    setShowFiltredTrip(!!searchValue && !!filtredValue.length);
  };

  const handleSubmitSearch = e => {
    e.preventDefault();
    const selectedCity = trips.find(
      item => item.city.toLowerCase() === searchingTrip.toLowerCase()
    );
    if (selectedCity) {
      setSelectedTrip(selectedCity);
      setSearchingTrip(selectedCity.city);
      setShowFiltredTrip(false);
      setCurrentTrip(null);
    } else {
      console.log('Вибране місто не знайдено в списку');
    }
  };

  const handleSelectedTrip = trip => {
    setSelectedTrip(trip);
    setSearchingTrip(trip.city);
    setShowFiltredTrip(false);
  };

  return (
    <div className={style.container}>
      <form onSubmit={handleSubmitSearch} className={style.formWrapper}>
        <button className={style.searchBtn} type="submit">
          <ion-icon name="search-outline"></ion-icon>
        </button>
        <input
          value={searchingTrip}
          className={style.inputContent}
          type="text"
          placeholder="Search your trip"
          onChange={handleOnchangeTrip}
        />
        {searchingTrip !== '' && (
          <button className={style.closeBtn} type="button" onClick={removeTrip}>
            <ion-icon name="close-outline"></ion-icon>
          </button>
        )}
        {showFiltredTrip && (
          <ul className={style.cityList}>
            {filtredTrip.map(item => (
              <li
                key={item.id}
                className={style.cityItem}
                onClick={() => handleSelectedTrip(item)}
              >
                {item.city}
              </li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
};

export default SearchTrip;
