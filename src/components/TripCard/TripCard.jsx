import React, { useEffect, useState } from 'react'
import style from './TripCard.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { selectAlltrips, selectTrip } from '../../redux/City/citySlice';
import { fetchAllTrip } from '../../redux/City/cityOperations';
import Spinner from '../Spinner/Spinner';

const TripCard = ({
  newTripAdded,
  selectedTrip,
  setCurrentTrip,
  currentTrip,
}) => {
  const dispatch = useDispatch();
  const trips = useSelector(selectAlltrips);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchAllTrip());
  }, [dispatch, newTripAdded]);

  const sortedTrips = trips.slice().sort((a, b) => {
    if (a.city === 'Kyiv') return -1;
    if (b.city === 'Kyiv') return 1;
    return 0;
  });

  const loadImage = () => {
    setLoading(true);
  };

  const handleTripSelected = trip => {
    setCurrentTrip(trip);
  };

  return (
    <section className={style.wrapper}>
      {trips &&
        !selectedTrip &&
        sortedTrips.map(item => (
          <div
            key={item.id}
            className={`${style.tripContainer} ${
              currentTrip === item && style.selected
            }`}
            onClick={() => handleTripSelected(item)}
          >
            {!loading && <Spinner />}
            <div style={{ display: loading ? 'block' : 'none' }}>
              <img
                alt={item?.city}
                src={item?.photo}
                width={300}
                height={260}
                className={style.photoCity}
                onLoad={loadImage}
              />
            </div>
            <div className={style.contentAboutTrip}>
              <p className={style.cityLabel}>{item?.city}</p>
              <p className={style.tripDate}>
                {item.startDate} - {item.endDate}
              </p>
            </div>
          </div>
        ))}
      {selectedTrip && (
        <div className={style.tripContainer}>
          {!loading && <Spinner />}
          <div style={{ display: loading ? 'block' : 'none' }}>
            <img
              alt={selectedTrip?.city}
              src={selectedTrip?.photo}
              width={300}
              height={260}
              className={style.photoCity}
              onLoad={loadImage}
            />
          </div>
          <div className={style.contentAboutTrip}>
            <p className={style.cityLabel}>{selectedTrip?.city}</p>
            <p className={style.tripDate}>
              {selectedTrip.startDate} - {selectedTrip.endDate}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default TripCard
