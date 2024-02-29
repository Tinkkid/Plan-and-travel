import React from 'react'
import style from './SortingFilter.module.css'

const SortingFilter = ({ handleChangeSortBy, sortBy }) => {
  return (
    <div>
      <select
        value={sortBy}
        onChange={handleChangeSortBy}
        className={style.sortDropdown}
      >
        <option value="default">Default Sorting</option>
        <option value="date">Sort by Date</option>
      </select>
    </div>
  );
};

export default SortingFilter
