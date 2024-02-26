import { useDispatch, useSelector } from 'react-redux';
import { selectCities } from '../redux/City/citySlice';
import Header from './Header/Header';
import SearchCity from './SearchCity/SearchCity';
import { useEffect, useState } from 'react';
import { fetchCities } from '../redux/City/cityOperations';
import CityCard from './CityCard/CityCard';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import FormTrip from './FormTrip/FormTrip';

function App() {
  const dispatch = useDispatch()
  const cities = useSelector(selectCities);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  console.log("TCL: App -> modalIsOpen", modalIsOpen)

  useEffect(() => {
    dispatch(fetchCities());
  },[dispatch])

  return (
    <>
      <Header />
      <SearchCity />
      <CityCard cities={cities} />
      <Button setModalIsOpen={setModalIsOpen} />
      {modalIsOpen && (
        <Modal onClose={() => setModalIsOpen(false)} isOpen={modalIsOpen}>
          <FormTrip />
        </Modal>
      )}
    </>
  );
}

export default App;
