import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

import style from './TripCard.module.css'
import { fetchAllTrip, removeTripById } from '../../redux/City/cityOperations';
import Spinner from '../Spinner/Spinner';

const TripCard = ({
  selectedTrip,
  setCurrentTrip,
  currentTrip,
  trips,
  sortedTrips,
  removeTrip,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchAllTrip());
  }, [dispatch]);

  const loadImage = () => {
    setLoading(true);
  };

  const handleTripSelected = trip => {
    setCurrentTrip(trip);
  };

  const handleDeleteTrip = id => {
    dispatch(removeTripById(id))
      .then(() => {
        dispatch(fetchAllTrip());
        removeTrip();
      })
      .catch(error => {
        console.error('Error deleting trip:', error);
      });
  };

  return (
    <section className={style.wrapper}>
      {trips.length === 0 && (
        <div className={style.emptyTripContainer}>
          {' '}
          <p className={style.emptyTripText}>
            Let's add your next incredible trip
          </p>
          <div style={{ display: 'flex' }}>
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </div>
        </div>
      )}
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
              <div className={style.containerCityAndDeleteBtn}>
                <p className={style.cityLabel}>{item?.city}</p>
                <button
                  onClick={() => handleDeleteTrip(item.id)}
                  type="button"
                  className={style.deleteBtn}
                >
                  <ion-icon name="trash-bin-outline"></ion-icon>
                </button>
              </div>

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
            <div className={style.containerCityAndDeleteBtn}>
              <p className={style.cityLabel}>{selectedTrip?.city}</p>
              <button
                onClick={() => handleDeleteTrip(selectedTrip?.id)}
                type="button"
                className={style.deleteBtn}
              >
                <ion-icon name="trash-bin-outline"></ion-icon>
              </button>
            </div>
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