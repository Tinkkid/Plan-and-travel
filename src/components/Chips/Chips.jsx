import React from 'react'

import style from './Chips.module.css'

const Chips = ({ removeTrip, selectedTrip }) => {
  return (
    <div>
      <button className={style.closeBtn} type="button" onClick={removeTrip}>
        {selectedTrip.city}
        <ion-icon name="close-outline"></ion-icon>
      </button>
    </div>
  );
};

export default Chips
