import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateReservation from './components/CreateReservation';
import Reservation from './components/Reservation';
import ReservationList from './components/ReservationList';
import Home from './components/Home';

function App() {
  const [reservations, setReservations] = useState([]);

  const addReservation = (reservation) => {
    setReservations([...reservations, reservation]);
  };

  const toggleBooked = (id) => {
    setReservations(
      reservations.map((res) =>
        res.id === id ? { ...res, booked: !res.booked } : res
      )
    );
  };

  return (
    <div className="App">
      <div className="App-header">
        <h1>Reservation App</h1>
        <p>Manage your reservations easily!</p>
      </div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/create-reservation"
            element={<CreateReservation onAddReservation={addReservation} />}
          />
          <Route
            path="/reservation/:id"
            element={<Reservation reservations={reservations} />}
          />
          <Route
            path="/reservation-list"
            element={
              <ReservationList
                reservations={reservations}
                onToggleBooked={toggleBooked}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
