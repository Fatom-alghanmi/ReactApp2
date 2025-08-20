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
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Home page */}
          <Route path="/" element={<Home />} />

          {/* Add Reservation */}
          <Route
            path="/create-reservation"
            element={<CreateReservation onAddReservation={addReservation} />}
          />

          {/* Single Reservation view */}
          <Route
            path="/reservation/:id"
            element={<Reservation reservations={reservations} />}
          />

          {/* Reservation List */}
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
