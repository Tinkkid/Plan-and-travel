import { useDispatch, useSelector } from 'react-redux';
import { selectCities } from '../redux/City/citySlice';
import Header from './Header/Header';
import SearchCity from './SearchCity/SearchCity';
import { useEffect } from 'react';
import { fetchCities } from '../redux/City/cityOperations';

function App() {
  const dispatch = useDispatch()
  const cities = useSelector(selectCities);

  useEffect(() => {
    dispatch(fetchCities());
  },[dispatch])
  console.log("TCL: App -> cities", cities)
  
  return (
    <>
      <Header />
      <SearchCity />
    </>
  );
}

export default App;
