import { useDispatch, useSelector } from 'react-redux';
import { selectAlltrips } from '../../redux/City/citySlice';
import { useEffect, useState } from 'react';
import { fetchAllTrip } from '../../redux/City/cityOperations';
import style from './SearchTrip.module.css';

const SearchTrip = ({ newTripAdded, setSelectedTrip }) => {
  const dispatch = useDispatch();
  const trips = useSelector(selectAlltrips);
  const [searchingTrip, setSearchingTrip] = useState('');
  const [filtredTrip, setFiltredTrip] = useState([]);
  const [showFiltredTrip, setShowFiltredTrip] = useState(false);
  // const [selectedTrip, setSelectedTrip] = useState();
  // console.log('TCL: SearchTrip -> selectedTrip', selectedTrip);

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
    // Якщо потрібно щось зробити при відправці форми
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
