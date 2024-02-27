import React, { useEffect } from 'react'
import style from './CityCard.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { selectAlltrips, selectTrip } from '../../redux/City/citySlice';
import { fetchAllTrip } from '../../redux/City/cityOperations';

const CityCard = ({ cities }) => {
  const dispatch = useDispatch()
  const trips = useSelector(selectAlltrips);
  const newTripAdded = useSelector(selectTrip);

     useEffect(() => {
       dispatch(fetchAllTrip());
     }, [dispatch, newTripAdded]);

  console.log("TCL: CityCard -> trip", trips)
   return (
     <section className={style.wrapper}>     
         <div className={style.tripContainer}>
           <img
             alt={cities[0]?.address}
             src={cities[0]?.url}
             width={300}
             height={300}
             className={style.photoCity}
           />
           <div className={style.contentAboutTrip}>
             <p className={style.cityLabel}>{cities[0]?.city}</p>
             <p className={style.tripDate}>Must see!</p>
           </div>
         </div>
      
       {trips &&
         trips.map(item => (
           <div key={item.id} className={style.tripContainer}>
             <img
               alt={item?.city}
               src={item?.photo}
               width={300}
               height={260}
               className={style.photoCity}
             />
             <div className={style.contentAboutTrip}>
               <p className={style.cityLabel}>{item?.city}</p>
               <p className={style.tripDate}>
                 {item.startDate} - {item.endDate}
               </p>
             </div>
           </div>
         ))}
     </section>
   );
};

export default CityCard
