import React from "react";
import { useParams } from "react-router-dom";

function Reservation({ reservations }) {
  const { id } = useParams();
  const reservation = reservations.find((r) => r.id.toString() === id);

  if (!reservation) return <p>Reservation not found</p>;

  return (
    <div>
      <h2>{reservation.name}</h2>
      <p>Time Slot: {reservation.timeSlot}</p>
      <p>Status: {reservation.booked ? "Booked" : "Not Booked"}</p>
    </div>
  );
}

export default Reservation;
