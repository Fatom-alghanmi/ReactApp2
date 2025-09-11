import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // import provider
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import CreateReservation from "./components/CreateReservation";
import Reservation from "./components/Reservation";
import ReservationList from "./components/ReservationList";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-reservation" element={<CreateReservation />} />
          <Route path="/reservation/:id" element={<Reservation />} />
          <Route path="/reservation-list" element={<ReservationList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
