import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateReservation from './components/CreateReservation';
import Reservation from './components/Reservation';
import ReservationsList from './components/ReservationList';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          { <Route path={"/"} element={<ReservationList />} /> }
          <Route path={"/create-reservation"} element={<CreateReservation />} />
          { <Route path={"/reservation/:id"} element={<Reservation />} /> }
          <Route path={"/reservation-list"} element={<ReservationList />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
