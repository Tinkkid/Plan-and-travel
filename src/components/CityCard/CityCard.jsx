import React from 'react'
import css from './CityCard.module.css'

const CityCard = ({ cities }) => {
  const {url,id,address,city} = cities;
   return (
     <section className={css.wrapper}>
       <div>
         <div>
           <img
             alt={cities[0].adress}
             src={cities[0].url}
             width={300}
             height={300}
           />
           <p>{cities[0].city}</p>
         </div>
       </div>
     </section>
   );
};

export default CityCard
